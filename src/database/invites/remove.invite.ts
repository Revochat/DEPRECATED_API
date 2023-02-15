import Logger from '../../client/logger.client';
import Invite, { IInviteModel } from '../models/Invite';

export const InviteRemove = async (invite_id: number) => { // Remove invite
    try {
        return Invite.deleteOne({ invite_id: invite_id }); // Remove invite
    } catch(err) {
        Logger.error(err)
    }
}
