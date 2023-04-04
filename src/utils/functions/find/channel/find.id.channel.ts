import DB from "../../../../database"
import UTILS from '../../../index';

export const findChannelID = (channelID: number) => { // fetch a channel by id
    try {
        var Channel = DB.channels.find.id(channelID) // Find the channel in the database
        if (!Channel) throw "Channel not found" // If the channel is not found, throw an error
        return Channel // Return the channel
    }
    
    catch (error) {
        throw error // Throw the error
    }
}