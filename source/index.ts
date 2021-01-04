'use strict';
import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import config from '../config/config';
import livreRoute from '../routes/livres.routes';
import userRoute from '../routes/utilisateurs.routes';
import authRoute from '../routes/auths.routes';
import passport from 'passport';
var cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
var session  = require('express-session');
var path = require('path');
app.use(cors());
app.use(cors({
    credentials:true,
}));
 
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use (express.static (__dirname));

const expressSession = require ('express-session') ({
    secret: "dev261",
    saveUninitialized: false
});
app.use(expressSession);
app.use (passport.initialize ());
app.use (passport.session ());

//Route LIVRES
app.use('/livres', livreRoute);

//Route UTILISATEUR
app.use('/utilisateurs', userRoute);

//Route AUTHENTIFICATION
app.use('/auth', authRoute);

const httpServer = http.createServer(app);
httpServer.listen(config.server.port, () => {
    console.log("Le serveur a bien démmaré avec le port:" , config.server.port);
}); 