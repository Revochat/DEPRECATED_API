import { IUser } from "../../../database/models/User";
import { IChannelPermission } from "../../../database/models/Channel";

export const GROUP = ( User: IUser, Friend_1: IUser, Friend_2: IUser ) : IChannelPermission => {
    return {
        manage: {
            user_id: [],
            roles_id: []
        },
        view: {
            user_id: [User.user_id, Friend_1.user_id, Friend_2.user_id],
            roles_id: []
        },
        message: {
            send: {
                user_id: [User.user_id, Friend_1.user_id, Friend_2.user_id],
                roles_id: []
            },
            send_files: {
                user_id: [User.user_id, Friend_1.user_id, Friend_2.user_id],
                roles_id: []
            },
            mentions: {
                user_id: [User.user_id, Friend_1.user_id, Friend_2.user_id],
                roles_id: []
            }
        },
        member: {
            invite: {
                user_id: [User.user_id, Friend_1.user_id, Friend_2.user_id],
                roles_id: []
            },
            remove: {
                user_id: [],
                roles_id: []
            }
        }
    }
}