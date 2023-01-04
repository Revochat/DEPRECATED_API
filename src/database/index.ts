import { MessageCreate, MessageFindOne, MessageDelete} from './messages/create.messages'
import { UserCreate, UserConnect, UserExist, UserGetOne, UserGetAll, UserFindByUsername, UserFindByToken, UserFindByID } from './users'
import { ChannelCreate, ChannelFindOne, ChannelDelete } from './channels/create.channels'

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
        create: MessageCreate,
        find: {
            id: MessageFindOne
        },
        delete: MessageDelete
    },
    channels: {
        create: ChannelCreate,
        find: {
            id: ChannelFindOne
        },
        delete: ChannelDelete            
    },
    servers: {
        create: () => {},
        find: {
            id: () => {}
        },
        delete: () => {}
    }
}

