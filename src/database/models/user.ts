'use strict';
import { DataTypes, Model } from 'sequelize';
import * as Enums from '../../enums/index';
export const UserModel = (sequelize: any, DataTypes: any) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
    }
  };
  User.init({
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    identity: DataTypes.STRING,
    rol: {
      type: DataTypes.ENUM(Object.values(Enums.RolType)),
      defaultValue: Enums.RolType.REGULAR
    },
    email: DataTypes.STRING,
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};