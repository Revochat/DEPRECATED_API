import { UserCreate, UserConnect, UserFind } from './users'

export default {
    users: {
        create: UserCreate,
        find: UserFind,
        log: UserConnect
    },
}