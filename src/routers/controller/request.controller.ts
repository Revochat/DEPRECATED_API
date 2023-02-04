import { ErrorIntercept } from "../errors/intercept.errors"
import { UserIntercept } from "../users/intercept.users"
import { ChannelsIntercept } from "../channels/intercept.channels"
import { ServerIntercept } from "../servers/intercept.servers"
import { MessagesIntercept } from "../messages/intercept.messages"
import { RolesIntercept } from "../roles/intercept.roles"

export const RouteIntercept = {
    UserIntercept,
    ChannelsIntercept,
    ServerIntercept,
    MessagesIntercept,
    ErrorIntercept,
    RolesIntercept
}