import { Request, Response } from 'express';
import { Module, Action } from '../../database/db';

export const getModule = async (req: Request, res: Response) => {
  try {
    const modules = await Module.findAll({
      include: [
        {
          model: Action,
          as: 'actions',
        }
      ]
    });
    res.json({ msg: 'Modulos: ', data: { modules } });
  }
  catch (error) {
    console.log(error)
  }
}


export const postModule = async (req: Request, res: Response) => {
  try {
    const { ...data } = req.body;
    const response = await Module.create(data);

    if (response) {
      res.json({
        msg: 'Ok',
        data: response
      })
    } else {
      res.json({ msg: 'Error al crear el modulo' })
    }
  } catch (error) {
    console.log(error)
  }

}

export const modifyModule = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const module = await Module.findByPk(id);
    if (module) {
      let newValues = req.body
      const response = await module.update(newValues);
      if (response) {
        res.json({ msg: 'Se ha actualizado el modulo correctamente', data: response });
      } else {
        res.json({ msg: 'Error al actualizar el modulo' })
      }
    }
  } catch (error) {
    res.json({ msg: 'Error al actualizar el modulo' })
  }
}



