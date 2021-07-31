import bcrypt from 'bcrypt';
import { User } from '../db';
import passport from 'passport';
import passportLocal from 'passport-local';
import jwtStrategy from 'passport-jwt';
const localStrategy = passportLocal.Strategy;
const JWTStrategy = jwtStrategy.Strategy;
const ExtractJWT = jwtStrategy.ExtractJwt;
const secret = process.env.TOKEN_SECRET;

passport.use(
  'register',
  new localStrategy(
    {
      usernameField: 'userName',
      passwordField: 'password',
      session: false,
    },
    (username, password, done) => {
      try {
        User
          .findOne({
            where: {
              username,
            },
          })
          .then(users => {
            if (users !== null) {
              console.log('username already taken');
              return done(null, false, { message: 'username already taken' });
            }
            bcrypt.hash(password, 16).then(hashedPassword => {
              console.log(hashedPassword)
              return done(null, { username, hashedPassword });
            });
          });
      } catch (error) {
        done(error);
      }
    },
  ),
);

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'userName',
      passwordField: 'password',
      session: false,
    },
    (username, password, done) => {
      try {
        User
          .findOne({
            where: {
              username,
            },
          })
          .then((users: any) => {
            if (users === null) {
              return done(null, false, { message: 'bad username' });
            }
            bcrypt.compare(password, users.password).then(response => {
              if (response != true) {
                console.log('password do not match');
                return done(null, false, { message: 'password do not match' });
              }
              console.log('user found & authenticated');
              return done(null, users);
            });
          });
      } catch (error) {
        done(error);
      }
    },
  ),
);

const opts = {
  jwtFromRequest: ExtractJWT.fromHeader('token'),
  secretOrKey: secret,
};

passport.use(
  'jwt',
  new JWTStrategy(opts, async (token, done) => {
    try {
      return done(null, token.user);
    } catch (error) {
      done(error);
    }
  }),
);
