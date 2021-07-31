import { Model, Sequelize} from 'sequelize';

export const GroupModel = (sequelize: Sequelize, DataTypes:any) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models:any) {
      // define association here
    }
  };
  Group.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};