import { Router } from 'express';
import { Auth } from '../middlewares/auth';
import groupRoutes from './group';
import userRoutes from './user';
import actionRoutes from './action';
import moduleRoutes from './module';

class IndexRoutes {

    router: Router

    constructor() {
        this.router = Router();
        this.routes();
    }


    routes() {
        this.router.get('/', (req, res) => res.send('Index'))
        this.router.use('/group', Auth, groupRoutes);
        this.router.use('/action', Auth, actionRoutes);
        this.router.use('/module', Auth, moduleRoutes);
        this.router.use('/user', userRoutes);
    }

}

const indexRoutes = new IndexRoutes();
indexRoutes.routes();
export default indexRoutes.router;