import { Sequelize } from 'sequelize';
import { UserModel } from './models/user';
import { GroupModel } from './models/group';
import { ActionModel } from './models/action';
import { ActionsGroupsModel } from './models/actionsGroups';
import { UsersGroupsModel } from './models/usersGroups';
import { ModuleModel } from './models/module';
import { users } from './seeders/data/users/users';
import { groups } from './seeders/data/groups/groups';
import { actions } from './seeders/data/actions/actions';
import { modules } from './seeders/data/modules/modules';
import { usersGroups, actionsGroups } from './seeders/data/associations/associations';

const config = require('./config/config');
let db = new Sequelize(config);

export const User = UserModel(db, Sequelize);
export const Group = GroupModel(db, Sequelize);
export const Action = ActionModel(db, Sequelize);
export const Module = ModuleModel(db, Sequelize);
export const ActionsGroups = ActionsGroupsModel(db, Sequelize);
export const UsersGroups = UsersGroupsModel(db, Sequelize);


//assocciations
User.belongsToMany(Group, { through: 'UsersGroups', as: 'groups', foreignKey: 'UserId' });
Group.belongsToMany(User, { through: 'UsersGroups', as: 'users', foreignKey: 'GroupId' });
Group.belongsToMany(Action, { through: 'ActionsGroups', as: 'action', foreignKey: 'GroupId' });
Action.belongsToMany(Group, { through: 'ActionsGroups', as: 'groups', foreignKey: 'ActionId' });
Module.hasMany(Action, { as: 'actions' });

//data seeders

const configData = {
  users: {
    model: User,
    data: users,
    reset: false
  },
  modules: {
    model: Module,
    data: modules,
    reset: false
  },
  actions: {
    model: Action,
    data: actions,
    reset: false
  },
  groups: {
    model: Group,
    data: groups,
    reset: false
  },
  usersGroups: {
    model: UsersGroups,
    data: usersGroups,
    reset: false
  },
  actionsGroups: {
    model: ActionsGroups,
    data: actionsGroups,
    reset: false
  },
}

db.sync()
  .then(() => {
    Object.entries(configData).forEach(async (item) => {
      if (item[1].reset) {
        await item[1].model.bulkCreate(item[1].data)
      }
    })
  })


