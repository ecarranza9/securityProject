import { Request, Response } from 'express';
import { Group } from '../../database/db';
import { User } from '../../database/db';
import { Action } from '../../database/db';

export const getGroup = async (req: Request, res: Response) => {
  try {
    const groups = await Group.findAll({
      include: [{
        model: User,
        as: 'users',
        through: { attributes: [] }
      },
      {
        model: Action,
        as: 'action',
        through: { attributes: [] }
      }
      ]
    });
    res.json({ msg: 'Grupos: ', data: { groups } });
  }
  catch (error) {
    console.log(error)
  }
}


export const postGroup = async (req: Request, res: Response) => {
  try {
    const { users, actions, ...data } = req.body;
    const response = await Group.create(data);

    if (users && users.length > 0) {
      response.setUsers(users);
    }

    if (actions && actions.length > 0) {
      response.setAction(actions);
    }

    if (response) {
      res.json({
        msg: 'Se ha creado el grupo',
        data: response
      })
    } else {
      res.json({ msg: 'No se ha podido crear el grupo' })
    }
  } catch (error) {
    console.log(error)
  }

}


export const modifyGroup = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const newValues = req.body;
    const groupToUpdate = await Group.findByPk(id, {
      include: [
        {
          model: User,
          as: 'users',
          through: { attributes: [] }
        },
        {
          model: Action,
          as: 'action',
          through: { attributes: [] }
        }
      ]
    });
    if (groupToUpdate) {
      const response = await groupToUpdate.update({
        name: newValues.name || groupToUpdate.get('name'),
        description: newValues.description || groupToUpdate.get('description'),
        isActive: newValues.isActive || groupToUpdate.get('isActive'),
      });
      if (newValues.users && newValues.users.length > 0) {
        response.setUsers(newValues.users);
      }

      if (newValues.actions && newValues.actions.length > 0) {
        response.setAction(newValues.actions);
      }

      if (response) {
        res.status(200).json({ msg: 'Se ha modificado el Grupo', data: response });
      }
    }
  } catch (error) {
    res.status(400).json({ msg: 'Se ha producido un error' })
  }
}

export const deleteGroup = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const groupToDelete = await Group.findByPk(id);
    if (groupToDelete) {
      const response = await groupToDelete.destroy();
      res.status(200).json({ msg: 'Grupo eliminado', data: response });
    } else {
      console.log("Ocurrio un error");
    }
  } catch (err) {
    res.status(400).json({ msg: 'Ocurrio un error' });
  }
};




