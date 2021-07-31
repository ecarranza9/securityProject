import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { RolType } from '../../enums/index';
import { User } from '../../database/db';
import { Group } from '../../database/db';
import { Action, ActionsGroups, UsersGroups } from '../../database/db';
import bcrypt from 'bcrypt';

dotenv.config();

const expires = process.env.TOKEN_EXPIRATION;
const secret = process.env.TOKEN_SECRET || '';

export const getUser = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      include: {
        model: Group,
        as: 'groups',
        through: { attributes: [] }
      },
    });
    res.json(users);
  }
  catch (error) {
    console.log(error)
  }
}

export function Login(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('login', (err, users, info) => {
    if (err) {
      console.log(err);
    }
    if (info !== undefined) {
      return res.status(400).json({ msg: 'Error en logeo' });
    }
    req.logIn(users, err => {
      User
        .findOne({
          where: {
            username: users.userName,
          },
        })
        .then(user => {
          const userData = user && user.get();
          const token = jwt.sign(
            { user: userData },
            secret,
            { expiresIn: expires },
          );
          const payload = {
            token,
            userData
          }
          return res.json({ msg: 'user found and logged', data: { auth: true, payload } })
        });
    });
  })(req, res, next);
}

export const AuthUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('token');
    if (token && secret) {
      const authData: any = jwt.verify(token, secret);
      const groups = await UsersGroups.findAll({ where: { UserId: authData.user.id } });
      const arrGroups = groups && groups.map(group => group.getDataValue('GroupId'));
      let actions = arrGroups.map(group => {
        let actionsQuery = ActionsGroups.findAll({ where: { GroupId: group } });
        return actionsQuery
      })
      const actionsResponse = await Promise.all(actions);
      const arrActions = actionsResponse.reduce((acc, action) => {
        return acc.concat(action);
      }).map(action => action.getDataValue('ActionId'));
      const getActionPath = arrActions.map(action => {
        let actionsPath = Action.findByPk(action)
        return actionsPath
      })
      const actionsPathResponse = await Promise.all(getActionPath);
      const responseActions = actionsPathResponse.map(action => action && action.getDataValue('path'));
      const payload = {
        user: authData.user,
        token,
        responseActions
      }
      return res.status(200).json(payload);
    }
  } catch (err) {
    return res.status(500).json({ msg: 'Hubo un error' });
  }
}

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const { email, rol, identity, groups } = req.body;
  passport.authenticate('register', async (err, users, info) => {
    if (err) {
      console.log(err);
    }
    if (info) {
      return res.status(400).json({ msg: 'El usuario ya existe' })
    } else {
      let newUser: any = await User.create({
        userName: users.username,
        password: users.hashedPassword,
        rol,
        identity,
        email
      });
      if (groups && groups.length > 0) {
        newUser.setGroups(groups);
      }
      if (newUser) {
        return res.status(200).json({ msg: 'user create', data: { newUser } });
      }
    }
  })(req, res, next);
}

export const modifyUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const newValues = req.body;
    const userToUpdate = await User.findByPk(id);
    if (userToUpdate) {
      const response = await userToUpdate.update({
        identity: newValues.identity,
        email: newValues.email,
        userName: newValues.userName,
        isActive: newValues.isActive
      });
      if (response) {
        res.status(200).json({ msg: 'Se ha modificado el usuario', data: response });
      }
    }
  } catch (error) {
    res.status(400).json({ msg: 'Se ha producido un error' })
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userToDelete = await User.findByPk(id);
    if (userToDelete) {
      const response = await userToDelete.destroy();
      res.status(200).json({ msg: 'Usuario eliminado', data: response });
    } else {
      console.log("Ocurrio un error");
    }
  } catch (err) {
    res.status(400).json({ msg: 'Ocurrio un error' });
  }
};


export const changePassword = async (req: Request, res: Response) => {
  try {
    const { userName, password, newPassword } = req.body
    const userToChange = await User.findOne({ where: { userName } })
    if (!userToChange) {
      res.status(404).json({ msg: 'El usuario no existe en nuestra base de datos' });
    }
    const userPasswordBD = userToChange && userToChange.getDataValue('password');
    const matchPassword = await bcrypt.compare(password, userPasswordBD);
    if (!matchPassword) {
      res.status(404).json({ msg: 'La contraseña ingresada no coincide con la del usuario' });
    }
    const newPasswordHash = await bcrypt.hash(newPassword, 16);
    const response = userToChange && await userToChange.update({
      password: newPasswordHash
    });
    if (response) {
      res.status(200).json({ msg: 'Se ha modificado la contraseña', data: response });
    }
  } catch (err) {
    res.status(400).json({ msg: 'Ocurrio un error' });
  }
}