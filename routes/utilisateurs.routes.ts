import express from 'express';
import userController from '../controller/utilisateur.controller'
const router = express.Router();

//Register utilisateur API POST
router.post('/registre',userController.registrerUser);

export = router;