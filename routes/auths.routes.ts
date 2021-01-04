import express from 'express';
import auth from '../controller/auth.controller'
const router = express.Router();

//Liste public pour les utilisateurs non connectés
router.post('/getAuth', auth.authUser);

export = router;