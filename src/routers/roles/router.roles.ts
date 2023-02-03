import { RolesIntercept } from './intercept.roles';

export const RolesRouter = {
    path: '/role',

    Create : {
        name : 'create',
        method: 'POST',
        path: '/create/:token/:server_id',
        socketing: false,
        description: 'Create a role',
        params: ['token', 'server_id', 'role_name', 'role_color', 'role_position'],
        res: RolesIntercept.create
    },
    Remove : {
        name : 'remove',
        method: 'GET',
        path: '/remove/:token/:role_id',
        socketing: false,
        description: 'Remove a role',
        params: ['token', 'role_id'],
        res: RolesIntercept.remove
    },
    Get : {
        name : 'get',
        method: 'GET',
        path: '/get/:token/:role_id',
        socketing: false,
        description: 'Get a role',
        params: ['token', 'role_id'],
        res: RolesIntercept.get
    }
}