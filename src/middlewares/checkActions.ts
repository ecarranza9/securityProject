import { Action, ActionsGroups, UsersGroups } from '../database/db';

export const checkedActionsUser = async (userId: string, path: string) => {

    const groups = await UsersGroups.findAll({ where: { UserId: userId } });
    const arrGroups = groups && groups.map(group => group.getDataValue('GroupId'));
    let actions = arrGroups.map(group => {
        let actionsQuery = ActionsGroups.findAll({ where: { GroupId: group } })
        return actionsQuery
    })
    const actionsResponse = await Promise.all(actions);
    const arrActions = actionsResponse.reduce(action => action).map(item => item.getDataValue('ActionId'));
    const getActionPath = arrActions.map(action => {
        let actionsPath = Action.findByPk(action)
        return actionsPath
    })
    const actionsPathResponse = await Promise.all(getActionPath);
    const responseActions = actionsPathResponse.map(action => action && action.getDataValue('path'));
    let existAction = responseActions.some(act => act === path.toString());
    if (existAction) {
        return true
    } else {
        return false
    }
}
