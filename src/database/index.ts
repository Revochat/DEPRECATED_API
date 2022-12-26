import { UserCreate, UserConnect, UserExist, UserGetOne, UserGetAll, UserFindByUsername, UserFindByToken } from './users'

export * from './interface.database'

export default {
    users: {
        create: UserCreate,
        exist: UserExist,
        log: UserConnect,
        get: {
            one: UserGetOne,
            all: UserGetAll
        },
        find: {
            username: UserFindByUsername,
            token: UserFindByToken
        },
        connect: UserConnect
    },
}

