'use strict';
import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import config from '../config/config';
import livreRoute from '../routes/livres.routes';
import userRoute from '../routes/utilisateurs.routes';
const passport = require('passport');
var cors = require('cors');
const jwt = require('jsonwebtoken');
var app = express();
var router=express.Router();
var session  = require('express-session');
const passportJWT = require('passport-jwt');
// let ExtractJwt = passportJWT.ExtractJwt;
app.use(cors());
app.use(cors({
    credentials:true,
}));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use (express.static (__dirname));
app.use (passport.initialize ());
app.use (passport.session ());
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
process.env.SECRET_KEY = "thisismysecretkey";
app.use('/secure-api', router);

// validation middleware
router.use(function(req,res,next){
    var token=req.body.token || req.headers['token'];
    if(token){
        jwt.verify(token,process.env.SECRET_KEY,function(err: any,ress: any){
            if(err){
                res.status(500).send('Token Invalid');
            }else{
                next();
            }
        })
    }else{
        res.send('Please send a token')
    }
})

//Route LIVRES
app.use('/livres', livreRoute);

//Route UTILISATEUR
app.use('/utilisateurs', userRoute);

//Route AUTHENTIFICATION
var authentification = require('../controller/auth.controller');
app.use('/auth', authentification.authUser);

app.get('/secret', passport.authenticate('jwt',{session: false}),(req,res,next)=>{
    res.json("Secret Data")
});

const httpServer = http.createServer(app);
httpServer.listen(config.server.port, () => {
    console.log("Le serveur a bien démmaré avec le port:" , config.server.port);
});