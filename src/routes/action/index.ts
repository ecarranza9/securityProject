import { Router } from 'express';
import {
  getAction,
  postAction,
  modifyAction
} from './controller';

class ActionRoutes {
  public router: Router
  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.route('/').get(getAction);
    this.router.route('/new').post(postAction);
    this.router.route('/edit/:id').put(modifyAction);
  }

}

const actionRoutes = new ActionRoutes();
actionRoutes.routes();
export default actionRoutes.router;