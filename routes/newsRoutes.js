const express = require('express')
const Newsapi = require('newsapi')
const dotenv = require('dotenv')

//CONFIG
dotenv.config();


const newsapi = new Newsapi(process.env.NEWS_API);


const router = express.Router();

const authCheckers = require('../authFunctions')

const checkAuthenticated = authCheckers.checkAuthenticated;
const checkUnAuthenticated = authCheckers.checkUnAuthenticated;

router.get('/userHome',checkAuthenticated,async (req,res)=>{
    const topHeadlines = await newsapi.v2.topHeadlines({
        language : 'en',
        pageSize : 8
      })
    const trending = await newsapi.v2.everything({q: 'trending', language: 'en',pageSize : 15})
    const sources = await newsapi.v2.sources({country:'in', language: 'en',pageSize : 10})    
    const topStories = await newsapi.v2.everything({sources:sources.sources[0].id+","+sources.sources[1].id, language: 'en',pageSize : 10})

    
    res.render('home.ejs',{topHeadlines : topHeadlines,trending : trending , topStories : topStories})
})

router.get('/business' ,checkAuthenticated, async(req,res)=>{
    const topBusinessHeadlinesCountry = await newsapi.v2.topHeadlines({category:'business' , country :'in',language:'en'})
    const topBusinessHeadlines = await newsapi.v2.topHeadlines({category:'business',language:'en'})
    res.render('business.ejs',{topBusinessHeadlines:topBusinessHeadlines,topBusinessHeadlinesCountry:topBusinessHeadlinesCountry})
    
})

router.get('/entertainment' ,checkAuthenticated, async(req,res)=>{
    const topEntertainmentHeadlinesCountry = await newsapi.v2.topHeadlines({category:'entertainment' , country :'in',language:'en'})
    const topEntertainmentHeadlines = await newsapi.v2.topHeadlines({category:'entertainment',language:'en'})
    res.render('entertainment.ejs',{topEntertainmentHeadlines:topEntertainmentHeadlines,topEntertainmentHeadlinesCountry:topEntertainmentHeadlinesCountry})
})

router.get('/health' ,checkAuthenticated, async(req,res)=>{
    const topHealthHeadlinesCountry = await newsapi.v2.topHeadlines({category:'health' , country :'in',language:'en'})
    const topHealthHeadlines = await newsapi.v2.topHeadlines({category:'health',language:'en'})
    res.render('health.ejs',{topHealthHeadlines:topHealthHeadlines,topHealthHeadlinesCountry:topHealthHeadlinesCountry})
})
router.get('/science' ,checkAuthenticated, async(req,res)=>{
    const topScienceHeadlinesCountry = await newsapi.v2.topHeadlines({category:'science' , country :'in',language:'en'})
    const topScienceHeadlines = await newsapi.v2.topHeadlines({category:'science',language:'en'})
    res.render('science.ejs',{topScienceHeadlines:topScienceHeadlines,topScienceHeadlinesCountry:topScienceHeadlinesCountry})
})
router.get('/sports' ,checkAuthenticated, async(req,res)=>{
    const topSportsHeadlinesCountry = await newsapi.v2.topHeadlines({category:'sports' , country :'in',language:'en'})
    const topSportsHeadlines = await newsapi.v2.topHeadlines({category:'sports',language:'en'})
    res.render('sports.ejs',{topSportsHeadlines:topSportsHeadlines,topSportsHeadlinesCountry:topSportsHeadlinesCountry})
})
router.get('/technology' ,checkAuthenticated, async(req,res)=>{
    const topTechnologyHeadlinesCountry = await newsapi.v2.topHeadlines({category:'technology' , country :'in',language:'en'})
    const topTechnologyHeadlines = await newsapi.v2.topHeadlines({category:'technology',language:'en'})
    res.render('technology.ejs',{topTechnologyHeadlines:topTechnologyHeadlines,topTechnologyHeadlinesCountry:topTechnologyHeadlinesCountry})
})

router.get('/localNews' ,checkAuthenticated, async(req,res)=>{
    console.log(req.user.city);
    const topLocalHeadlinesCountry = await newsapi.v2.everything({q:req.user.city,language:'en',pageSize:'40'})
    res.render('local.ejs',{topLocalHeadlinesCountry:topLocalHeadlinesCountry,city:req.user.city})
})

router.get('/international' ,checkAuthenticated, async(req,res)=>{
    const topWorldHeadlines = await newsapi.v2.topHeadlines({language:'en',pageSize : 40})
    res.render('international.ejs',{topWorldHeadlines , topWorldHeadlines})
})
module.exports = router;