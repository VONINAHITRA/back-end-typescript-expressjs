import express, { Application } from 'express';
//Routes API
import IndexRoute from './routes/index.routes'

export class App {
   private app: Application;
//contructeur
    constructor(private port?: number | string) {
        this.app = express();
        this.settings();
        this.routes();
    }
//parametre de port
    settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }
 //ecoute
    async listen() {
      await this.app.listen(this.app.get('port'));
        console.log('Le serveur est bien démarré sur le port',this.app.get('port'));
    }
//Route 
    routes() {
        this.app.use(IndexRoute);
    }
    
  
}