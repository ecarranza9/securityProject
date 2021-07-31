import {Router} from 'express';
import {
    getModule,
    postModule,
    modifyModule
} from './controller';

class ModuleRoutes {
    public router: Router
    constructor(){
        this.router = Router();
        this.routes();
    }

    routes(){
        this.router.route('/').get(getModule);
        this.router.route('/new').post(postModule);
        this.router.route('/edit/:id').put(modifyModule);
    }

}

const moduleRoutes = new ModuleRoutes();
moduleRoutes.routes();
export default moduleRoutes.router;