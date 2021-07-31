import {Request, Response, Router} from 'express';
import {
    getGroup,
    postGroup,
    modifyGroup,
    deleteGroup
} from './controller';

class GroupRoutes {
    public router: Router
    constructor(){
        this.router = Router();
        this.routes();
    }

    routes(){
        this.router.route('/').get(getGroup);
        this.router.route('/new').post(postGroup);
        this.router.route('/:id').put(modifyGroup);
        this.router.route('/:id').delete(deleteGroup);
    }

}

const groupRoutes = new GroupRoutes();
groupRoutes.routes();
export default groupRoutes.router;