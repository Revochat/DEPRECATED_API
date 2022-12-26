import { UserCreate, UserConnect, UserFind } from './users'

export * from './interface.database'

export default {
    users: {
        create: UserCreate,
        find: UserFind,
        log: UserConnect
    },
}

