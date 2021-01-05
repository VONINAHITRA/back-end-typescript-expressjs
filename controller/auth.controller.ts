
const bcrypt = require('bcrypt');
var jwt=require('jsonwebtoken');
// const localStratefy = require('passport-local').Strategy;
const NAMESPACE = "Authentification";
/* POUR API UTILISATEUR */
var jwt=require('jsonwebtoken');
var connection = require('../config/base');

module.exports.authUser = function (req: any, res: any) {
    
    let  courriel=req.body.auth.courriel;
    let  motDePasse = req.body.auth.motDePasse;

    connection.query(`SELECT * FROM utilisateur WHERE courriel ='${courriel}' AND motDePasse ='${motDePasse}'`,function (error: any, results: string | any[], fields: any) {
      if (error) {
          res.json({
            status:false,
            message:error
          })
      } else {
        if (results.length > 0) {
          if (motDePasse == results[0].motDePasse) {
                // var token=jwt.sign(JSON.stringify(results[0]),process.env.SECRET_KEY,{
                //     expiresIn:5000
                // });
               
              var token = jwt.sign({
                  data: JSON.stringify(results[0])
              }, 'secret', { expiresIn: '5h' });
            console.log("token",token);
                res.json({
                    status:true,
                    token:token
                })
                
            }else{
                res.json({
                  status:false,                  
                  message:"Email and password does not match"
                 });
            }
        }
        else{
          res.json({
              status:false,
             message:res
          });
          
        }
      }
    });
}