import { IUser } from '../../../../database/models/User';
import UTILS from '../../../index';
import Logger from '../../../../client/logger.client';

export const findChannelFriend = async (User: IUser, Friend: IUser) => { // Find a channel between two users
    var Channel = User.channels // Get the channel from the user
    var Channeltemp = null
    if (!Channel) throw "Channel not found" // If the channel is not found, throw an error

    for (var i = 0; i < Channel.length; i++) { // iterate through the channels and find the channel with the friend id
        Channeltemp = await UTILS.FUNCTIONS.FIND.CHANNEL.id(Channel[i]) // fetch the channel
        if (Channeltemp) { // check if the channel is a private channel
            if (Channeltemp.channel_type === UTILS.CONSTANTS.CHANNEL.TYPE.HYBRID) {
                if (Channeltemp.members.includes(Friend.user_id)) { // check if the channel has the friend id
                    return Channeltemp // return the channel
                }
            }
        }
    }

    if (!Channel) throw "Channel not found" // If the channel is not found, throw an error
}