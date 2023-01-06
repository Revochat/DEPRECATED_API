import { ErrorIntercept } from "../errors/intercept.errors"
import { UserInterceptEssentials } from "../users/intercept.users.essentials"
import { UserInterceptSocials } from "../users/intercept.users.socials"
import { ChannelsInterceptEssentials } from "../channels/intercept.channels.essentials"
import { ChannelsInterceptModeration } from "../channels/intercept.channels.moderation"
// import { ServerIntercept } from "../servers/intercept.servers"
import { MessagesIntercept } from "../messages/intercept.messages"

export const RouteIntercept = {
    UserInterceptEssentials,
    UserInterceptSocials,
    ChannelsInterceptEssentials,
    ChannelsInterceptModeration,
    // ServerIntercept,
    MessagesIntercept,
    ErrorIntercept
}