import { IUser } from '../../../../database/models/User';
import UTILS from '../../../index';
export const findChannel = (User: IUser, Friend: IUser) => { // Find a channel between two users
    // var Channel = User.channels // Get the channel from the user

    // if (!Channel) throw "Channel not found" // If the channel is not found, throw an error
    // // iterate through the channels and find the channel with the friend id
    // for (var i = 0; i < Channel.length; i++) {
    //     if (Channel[i].user_id == Friend.user_id) {
    //         // is the channel a private channel
    //         if (Channel[i].type == "private") {
    //             Channel = Channel[i] // Set the channel to the channel
    //         break // Break the loop
    //     }
    // }

    // if (!Channel) throw "Channel not found" // If the channel is not found, throw an error
    // return Channel // Return the channel
    // }
}