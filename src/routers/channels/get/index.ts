import { getChannel } from "./channels.get";
import { getMembers } from "./channels.members.get";
import { getMessages } from "./channels.messages.get";


export const get = {
    channel: getChannel,
    members: getMembers,
    messages: getMessages
}