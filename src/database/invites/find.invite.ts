import Logger from '../../client/logger.client';
import Invite from '../models/Invite';

export const InviteFindOne = async (invite_id: number) => { // Find invite
    try {
        return Invite.findOne({invite_id: invite_id});
    } catch(err) {
        Logger.error(err)
    }
}