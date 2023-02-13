import Invite, { IInviteModel } from '../models/Invite';

export const InviteCreate = async (invite: IInviteModel) => { // Create invite
    return Invite.create(invite); // Create invite
}