import { Model, Sequelize} from 'sequelize';
export const UsersGroupsModel = (sequelize: Sequelize, DataTypes:any) => {
  class UsersGroups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models:any) {
      // define association here
    }
  };
  UsersGroups.init({
    UserId: {
        type: DataTypes.STRING
    },
    GroupId: {
        type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'UsersGroups',
  });
  return UsersGroups;
};