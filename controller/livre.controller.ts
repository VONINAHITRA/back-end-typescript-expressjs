import { Connect, Query } from '../config/mysql'
import { NextFunction, Request, Response } from 'express';
'use strict';
const NAMESPACE = "LIVRES";

/* POUR API UTILISATEUR */

//Livre public
const livrePublic = (req: Request, res: Response, next: NextFunction) => {
    console.log('sSéléctionner livre public seulement');
    let type = "Public";
    let query = `SELECT * FROM livre WHERE type="${type}" ORDER BY datePub DESC` ;
    console.log(query);
    Connect()
        .then(connection => {
            Query(connection, query)
                .then(publics => {
                    return res.status(200).json({
                      publics
                    });
                })
                .catch(error => {
                    return res.status(500).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    connection.end();
            })
    })
}

//Livre publiv et privé
const livrePrive = (req: Request, res: Response, next: NextFunction) => {
    console.log('sSéléctionner livre privé et public');
    let query = `SELECT * FROM livre ORDER BY datePub DESC`;
    console.log(query);
    Connect()
        .then(connection => {
            Query(connection, query)
                .then(prives => {
                    return res.status(200).json({
                      prives
                    });
                })
                .catch(error => {
                    return res.status(500).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    connection.end();
            })
        })
    
}

/* Create livre */
const CreateLivre = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body.livre);
    var couvertureBase64 = Buffer.from(req.body.livre.couverture, 'utf-8').toString('base64');
    let query = `INSERT INTO livre(titre, description,couverture, auteur,datePub,type)VALUES ("${req.body.livre.titre}","${req.body.livre.description}","${couvertureBase64}","${req.body.livre.auteur}","${req.body.livre.datePub}","${req.body.livre.type}")`;
    Connect()
        .then(connection => {
            Query(connection, query)
                .then(regitre => {
                    return res.status(200).json({
                        regitre
                    });
                })
                .catch(error => {
                    return res.status(500).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    connection.end();
                })
        })
}
export default { livrePublic,livrePrive,CreateLivre };