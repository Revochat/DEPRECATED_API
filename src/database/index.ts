import { MessageCreate } from './messages/create.messages'
import { UserCreate, UserConnect, UserExist, UserGetOne, UserGetAll, UserFindByUsername, UserFindByToken, UserFindByID } from './users'

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
            token: UserFindByToken,
            id: UserFindByID
        },
        connect: UserConnect
    },
    messages: {
        create: MessageCreate
    }
}

