// check whether the channel is a server channel, a private channel or a group channel

// if the channel is a server channel, check whether the user is a member of the server

import {IChannel} from '../../../database/models/Channel'

export const checkChannelType = (channel: IChannel) => {
    if (channel.server_id) return 'server'
    if (channel.owner_id) return 'group'
    return 'private'
}