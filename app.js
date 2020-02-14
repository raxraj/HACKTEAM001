const express = require('express')
const app =  express();
const chalk = require('chalk')
const mongoose = require('mongoose')
const passport = require("passport")
const flash = require("express-flash")
const session = require("express-session")
const dotenv = require('dotenv')
var bodyParser = require('body-parser')
const sendinmail = require('send-in-mail')



//CONFIG DOTENV
dotenv.config();

//ROUTES FILE
const newsRoutes = require('./routes/newsRoutes')


//MAILER TRANSPORTER
const transporter = sendinmail.mailerInitialise({
    user: process.env.MAILID,
    pass: process.env.MAILPASS
})


//MONGO CONNECT
try {
    mongoose.connect(process.env.MONGO_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => {  
        console.log(chalk.magentaBright("Connected to Mongo"));
    })
} catch (error) {
    console.error(error);
}

//MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
    secret : 'SOME$ecre!',
    resave : false,
    saveUninitialized : false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use('/',newsRoutes)

const initializePassport = require('./passportConfig')

 


//MODEL
let userCollection = require('./models/users')

//PASSPORT INITIALISE
initializePassport(passport , 
    username=>userCollection.findOne({username : username}).then(user=>user),
    id => userCollection.findById(id).then(user=>user)
)

//VIEW ENGINE
app.set('view engine', 'ejs')
//PUBLIC FOLDER
app.use(express.static(__dirname+'/public'))
app.use(session({
    secret : 'SOME$ecre!',
    resave : false,
    saveUninitialized : false
}))

const authCheckers = require('./authFunctions')
const checkUnAuthenticated = authCheckers.checkUnAuthenticated;
const checkAuthenticated = authCheckers.checkAuthenticated


app.post("/login", passport.authenticate('local', {
    successRedirect : '/userHome',
    failureRedirect : '/',
    failureFlash:true
}))

//FUNCTIONS
const functions = require('./functions.js')


app.post('/addUser' , (req,res)=>{
    req.body.otp = functions.otpGen();
    req.body.interests = (req.body.interests).split(',');
    new userCollection(req.body).save().then((user,err)=>{
        if(err){
            res.send({done:false, message : 'Unknown Error Occured'})
        }
        else{
            //ALSO SEND THE OTP
            sendinmail.sendMail(transporter,{
                from: 'raj.fungus@gmail.com',
                to: [req.body.email],
                subject: 'VERIFY YOUR NEWSMATE ACCOUNT',
                text: 'Kindly Enter the OTP Given for verification : '+req.body.otp,
            })    //VIEW ENGINE
            req.flash('success', 'You have been registered!')
            
            app.use(session({
                secret : 'SOME$ecre!',
                resave : false,
                saveUninitialized : false
            }))


            //ResPonse
            res.redirect('/register')
        }
    })
})

app.get('/', checkUnAuthenticated ,(req,res)=>{
    res.render('login.ejs')
})
app.get('/register', checkUnAuthenticated ,(req,res)=>{
    res.render('signup.ejs')
})

app.listen(process.env.PORT||3000,()=>{
    console.log(chalk.green("Server is running"));
})