import DB from "../../../../database"

export const findFriendbyUser = async (token: string, friend_id: number) => {
    var User = await DB.users.find.token(token) // Find the user in the database
    if (!User) throw "User not found" // If the user is not found, throw an error
    var Friend = User.friends.get(friend_id) // Get the friend from the user
    if (!Friend) throw "Friend not found" // If the friend is not found, throw an error
    return Friend // Return the friend
}