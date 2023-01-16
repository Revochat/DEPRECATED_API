import { IUser } from "../../../database/models/User";
import { IChannelPermission } from "../../../database/models/Channel";

export const PRIVATE = ( User: IUser, Friend: IUser ) : IChannelPermission => {
    return {
        manage: {
            user_id: [],
            roles_id: []
        },
        view: {
            user_id: [User.user_id, Friend.user_id],
            roles_id: []
        },
        message: {
            send: {
                user_id: [User.user_id, Friend.user_id],
                roles_id: []
            },
            send_files: {
                user_id: [User.user_id, Friend.user_id],
                roles_id: []
            },
            mentions: {
                user_id: [User.user_id, Friend.user_id],
                roles_id: []
            }
        },
        member: {
            invite: {
                user_id: [],
                roles_id: []
            },
            remove: {
                user_id: [],
                roles_id: []
            }
        }
    }
}
