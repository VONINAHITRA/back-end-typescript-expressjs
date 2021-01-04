import { Connect, Query } from '../config/mysql'
import { NextFunction, Request, Response } from 'express';
const bcrypt = require('bcrypt');
const localStratefy = require('passport-local').Strategy;
const NAMESPACE = "Authentification";

/* POUR API UTILISATEUR */
const authUser = (req: Request, res: Response, next: NextFunction) => {
    console.log('Authentification des utilisateurs');
    //réfs: courriel et mot de passe
    let courriel = req.body.auth.courriel;
    let motDePasse = req.body.auth.motDePasse;
    console.log(courriel);
    let query = `SELECT * FROM utilisateur WHERE courriel="${courriel}" AND motDePasse="${motDePasse}"`;
    Connect()
        .then(connection => {
            Query(connection, query)
                .then(conx => {
                    return res.status(200).json({
                      "results":"succes"
                    });
                })
                .catch(error => {
                    return res.status(404).json({
                       "results":"Warning"
                    });
                })
                .finally(() => {
                    connection.end();
            })
    })
}

export default { authUser };