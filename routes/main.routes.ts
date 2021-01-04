import express from 'express';
import mainApi from '../controller/main.controller'

const router = express.Router();

//Afficher livre public pour les utilisateurs non authentifiés
router.get('/userNonAuth', mainApi.userNoAuth);

//Afficher livre public pour les utilisateurs authentifiés
router.get('/userAuth', mainApi.userAuth);

export = router;