import Invite, { IInviteModel } from '../models/Invite';

export const InviteRemove = async (invite_id: number) => { // Remove invite
    return Invite.deleteOne({ invite_id: invite_id }); // Remove invite
}