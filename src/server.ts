import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import indexRoutes from './routes';
import './database/db';
import './database/config/passport';
import passport from 'passport';
import dotenv from 'dotenv';
dotenv.config();

const cors = require('cors');


class Server {
    public app: express.Application;
    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config(){
        this.app.set('port', process.env.PORT || 4000);
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(helmet());
        this.app.use(passport.initialize());
        this.app.use(cors());
    }
    routes(){
        this.app.use(indexRoutes);
    }
    start(){
        this.app.listen(this.app.get('port'), () => {
            console.log('server listening on port', this.app.get('port'));
        })
    }
}

const server = new Server();
server.start();