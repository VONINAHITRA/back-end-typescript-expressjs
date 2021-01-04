import { Connect, Query } from '../config/mysql'
import { NextFunction, Request, Response } from 'express';
import { Connection } from 'typeorm';

const NAMESPACE = "utilisateurs";

/* Vérifier email */
const registrerUser = (req: Request, res: Response, next: NextFunction) => {

    let prenom = req.body.utilisateur.prenom;
    let nomFamille = req.body.utilisateur.nomFamille;
    let courriel = req.body.utilisateur.courriel;
    let motDePasse = req.body.utilisateur.motDePasse;

    if ((prenom != "") && (nomFamille != "" ) && (courriel!="") && motDePasse!="") {
        if(motDePasse.match(/[-+!*$@%_]/g) && motDePasse.match(/[A-Z]/g) && motDePasse.match(/[a-z]/g) && motDePasse.match( /[^a-zA-Z\d]/g) && motDePasse.length == 8){
    
  /* Vérifié l'email email */
            let requetVerifier = `SELECT *  FROM utilisateur WHERE courriel="${req.body.utilisateur.courriel}"`;
            Connect()
              .then(async connectionE => {
                let email = Query(connectionE, requetVerifier)
                  if (await email == false) {

       /* Registrer des utilisateurs apres vérification email */
        let query = `INSERT INTO utilisateur(prenom, nomFamille, courriel, motDePasse) VALUES ("${prenom}","${nomFamille}","${courriel}","${motDePasse}")`;
        Connect()
            .then(connection => {
                Query(connection, query)
                    .then(results => {
                        return res.status(200).json({
                            "results":"Vos information sont enregistrées dans la base"
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
    } else {
            return res.status(200).json({
                "results": "Adresse courriel exite déjà, Veuillez saisir un autre valide ",
            });
    }
})
         }else {
            return res.status(200).json({
                "results":"Votre mot de passe est invalide,Veuillez saisir un mot de passe valide",
           });
        }

    } else {
        return res.status(200).json({
            "results":"Tous les champs sont obligatoires, Veuillez remplir svp!",
       });
       }

}

    export default { registrerUser };