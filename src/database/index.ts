import { MessageCreate, MessageFindOne, MessageDelete, MessageFindUser, MessageFindChannel} from './messages/'
import { UserCreate, UserConnect, UserExist, UserGetOne, UserGetAll, UserFindByUsername, UserFindByToken, UserFindByID, UserGetAllChannels } from './users'
import { ChannelCreate, ChannelFindOne, ChannelDelete, GetXNumberofMessages, ChannelFindUser } from './channels'
import { RoleCreate, RoleFindOne } from './roles'
import { ServerCreate, ServerFindOne, ServerDelete, ServerFindUser } from './servers'

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
            id: UserFindByID,
            many: UserGetAll,
            channels: UserGetAllChannels
        },
        connect: UserConnect
    },
    messages: {
        create: MessageCreate,
        find: {
            id: MessageFindOne,
            user: MessageFindUser,
            channel: MessageFindChannel
        },
        delete: MessageDelete
    },
    channels: {
        create: ChannelCreate,
        find: {
            id: ChannelFindOne,
            messages: GetXNumberofMessages,
            userInChannel: ChannelFindUser
        },
        delete: ChannelDelete            
    },
    servers: {
        create: ServerCreate,
        find: {
            id: ServerFindOne,
            userInServer: ServerFindUser
        },
        delete: ServerDelete
    },
    role: {
        create: RoleCreate,
        find: {
            id: RoleFindOne
        }
    }
}

