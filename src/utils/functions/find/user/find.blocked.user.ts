import DB from "../../../../database"

export const findUserBlocked = async (user_id: number, blocked_id: number) => {
    var User = await DB.users.find.id(user_id)
    var Blocked = await DB.users.find.id(blocked_id)

    if (!User || !Blocked) return false
    if (!User.blocked) return false

    if (User.blocked.includes(Blocked.user_id)) return true
    return false
}