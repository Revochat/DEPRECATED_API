export const findUserInServer = (User: any, Server: any) => {
    if (Server.members.length === 0) { // if the server has no members, return false
        return false
    }
    
    // get keys of all members in map array
    for (var i = 0; i < Server.members.length; i++) {
        // get the keys of the map array
        var keys = Object.keys(Server.members[i])
        if (keys.includes(User.user_id.toString())) { // if the user is a member of the server, break out of the loop
            break
        }
        return false
    }
    return true
}