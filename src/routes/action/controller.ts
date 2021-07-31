import { Request, Response } from 'express';
import { Action, Module } from '../../database/db';

export const getAction = async (req: Request, res: Response) => {
  try {
    const actions = await Action.findAll({});
    res.json({ msg: 'Actions: ', data: { actions } });
  }
  catch (error) {
    console.log(error)
  }
}


export const postAction = async (req: Request, res: Response) => {
  try {
    const { ...data } = req.body;
    if (data.ModuleId) {
      const existModule = await Module.findByPk(data.ModuleId);
      if (existModule) {
        const values = {
          ...data,
          ModuleId: existModule.getDataValue('id'),
        }
        const response = await Action.create(values);
        if (response) {
          res.json({
            msg: 'Ok',
            data: response
          })
        } else {
          res.json({ msg: 'Error al crear la accion' })
        }
      } else {
        res.json({ msg: 'El modulo ingresado no existe' })
      }
    }
  } catch (error) {
    console.log(error)
  }

}

export const modifyAction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const action = await Action.findByPk(id);
    if (action) {
      let newValues = req.body
      const response = await action.update(newValues);
      if (response) {
        res.json({ msg: 'Se ha actualizado la accion correctamente', data: response });
      } else {
        res.json({ msg: 'Error al actualizar la accion' })
      }
    }
  } catch (error) {
    res.json({ msg: 'Error al actualizar la accion' })
  }
}



