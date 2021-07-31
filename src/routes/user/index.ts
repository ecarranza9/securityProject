import { Router } from 'express';
import {
    getUser,
    signUp,
    Login,
    modifyUser,
    deleteUser,
    changePassword,
    AuthUser
} from './controller';

class UserRoutes {
    router: Router
    constructor() {
        this.router = Router();
    }

    routes() {
        this.router.route('/').get(getUser)
        this.router.route('/login').post(Login);
        this.router.route('/signup').post(signUp);
        this.router.route('/:id').put(modifyUser);
        this.router.route('/change-password').patch(changePassword);
        this.router.route('/:id').delete(deleteUser);
        this.router.route('/auth').get(AuthUser);
    }
}

const userRoutes = new UserRoutes();
userRoutes.routes();
export default userRoutes.router;