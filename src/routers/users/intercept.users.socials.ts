import { addFriend, removeFriend } from "./friends"
import { addBlocked, removeBlocked } from "./blocked"

export const UserInterceptSocials = {

    addFriend : addFriend,
    
    removeFriend : removeFriend,

    addBlocked: addBlocked,

    removeBlocked: removeBlocked
}