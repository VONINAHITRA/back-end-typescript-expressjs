import { Connect, Query } from '../config/mysql'
import { NextFunction, Request, Response } from 'express';

const NAMESPACE = "main";

/* POUR API UTILISATEUR */
const userNoAuth = (req: Request, res: Response, next: NextFunction) => {
    console.log('select livre pour les users non authentifiés');
    let type = "Public";
    let query = `SELECT * FROM livre WHERE type="${type}"` ;
    console.log(query);
    Connect()
        .then(connection => {
            Query(connection, query)
                .then(livres => {
                    return res.status(200).json({
                      livres
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

//User Auth
const userAuth = (req: Request, res: Response, next: NextFunction) => {
    console.log('select livres pour les users authentifiés');
    let query = `SELECT * FROM livre` ;
    console.log(query);
    Connect()
        .then(connection => {
            Query(connection, query)
                .then(results => {
                    return res.status(200).json({
                      results
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

/* Registrer des utilisateurs */

export default { userNoAuth,userAuth };