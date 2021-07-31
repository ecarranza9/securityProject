import { Model, Sequelize } from 'sequelize';
export const ActionsGroupsModel = (sequelize: Sequelize, DataTypes: any) => {
  class ActionsGroups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  };
  ActionsGroups.init({
    ActionId: {
      type: DataTypes.STRING
    },
    GroupId: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'ActionsGroups',
  });
  return ActionsGroups;
};