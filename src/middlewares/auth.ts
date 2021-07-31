import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

export function Auth(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('jwt', { session: false }, (err, users, info) => {
    if (err) {
      console.log(err);
      res.send({ msg: err })
    }
    if (info !== undefined) {
      res.send({ msg: err })
    }

    if (users) {
      next();
    }
  })(req, res, next);
}

