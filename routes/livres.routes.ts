import express from 'express';
import livreApi from '../controller/livre.controller';
const router = express.Router();

//Afficher livre public pour les utilisateurs non authentifiés
router.get('/listLivrePublic', livreApi.livrePublic);

//Afficher livre public pour les utilisateurs authentifiés
router.get('/listLivreAll', livreApi.livrePrive);

//Ajouter livre public pour les utilisateurs authentifiés
router.post('/createLivre',livreApi.CreateLivre);

export = router;