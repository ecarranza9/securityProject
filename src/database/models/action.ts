import { Model, Sequelize} from 'sequelize';
export const ActionModel = (sequelize: Sequelize, DataTypes:any) => {
  class Action extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models:any) {
      // define association here
    }
  };
  Action.init({
    name: DataTypes.STRING,
    path: DataTypes.STRING,
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Action',
  });
  return Action;
};