const localStrategy =  require("passport-local").Strategy

function initialize(passport , getUser , getUserbyId){  
    const authenticateUser = async (username , password , done)=>{
        
        const user = await getUser(username)
        if(user==null){
            return done(null , false , {message : "User Not Found"})
        }
        try{
            if(password === user.password){
                console.log('LOGGED IN');
                
                return done(null,user)
            }
            else{
                return done(null ,false, {message : "Wrong Password"})
            }
        }
        catch(e){
            return done(e)

        }

    }
    passport.use(new localStrategy({usernameField : 'username'}, authenticateUser))

    passport.serializeUser(async (user,done) =>{ return done(null,user._id)})
    passport.deserializeUser(async (id,done)=>{
        const user = await getUserbyId(id);
        return done(null ,user)}) 
}

module.exports = initialize