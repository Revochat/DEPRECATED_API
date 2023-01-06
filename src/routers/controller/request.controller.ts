import { ErrorIntercept } from "../errors/intercept.errors"
import { UserInterceptEssentials } from "../users/intercept.users.essentials"
import { UserInterceptSocials } from "../users/intercept.users.socials"
// import { ChannelIntercept } from "../channels/intercept.channels"
// import { ServerIntercept } from "../servers/intercept.servers"
import { MessagesIntercept } from "../messages/intercept.messages"

export const RouteIntercept = {
    UserInterceptEssentials,
    UserInterceptSocials,
    // ChannelIntercept,
    // ServerIntercept,
    MessagesIntercept,
    ErrorIntercept
}