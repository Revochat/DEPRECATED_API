import Invite from '../models/Invite';

export const InviteFindOne = async (invite_id: number) => { // Find invite
    return Invite.findOne({invite_id: invite_id});
}