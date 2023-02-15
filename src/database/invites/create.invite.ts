import Logger from '../../client/logger.client';
import Invite, { IInviteModel } from '../models/Invite';

export const InviteCreate = async (invite: IInviteModel) => { // Create invite
    try {
        return Invite.create(invite); // Create invite
    } catch(err) {
        Logger.error(err)
    }
}