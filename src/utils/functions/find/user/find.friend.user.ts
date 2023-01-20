import DB from "../../../../database"
import { IUser } from '../../../../database/models/User';
import UTILS from '../../../index';

export const findFriendbyUser = async (User: IUser, Friend: IUser) => { // find if the friend is in the user's friend list
    if (!User.friends) throw "Friend not found"
    if (User.friends.includes(Friend.user_id)) return true
    return false
}