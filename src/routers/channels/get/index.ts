import { getChannel } from "./channels.get";
import { getMembers } from "./channels.members.get";
import { getMessages } from "./channels.messages.get";
import { getPermissions } from "./channels.permissions.get";
import { getChannelCreatedAt } from "./channels.created_at.get";
import { getChannelUpdatedAt } from "./channels.updated_at.get";
import { getChannelMembersCount } from "./channels.members_count.get";
import { getChannelType } from "./channels.type.get";
import { getChannelName } from "./channels.name.get";
import { getChannelOwnerID } from "./channels.owner.get";

export const get = {
    channel: getChannel,
    members: getMembers,
    messages: getMessages,
    permissions: getPermissions,
    channel_name: getChannelName,
    created_at: getChannelCreatedAt,
    updated_at: getChannelUpdatedAt,
    members_count: getChannelMembersCount,
    channel_type: getChannelType,
    owner_id: getChannelOwnerID
}