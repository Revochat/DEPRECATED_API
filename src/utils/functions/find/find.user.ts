import DB from "../../../database/"

export const findUser = async (token: string) => {
    var User = await DB.users.find.token(token) // Find the user in the database
    if (!User) throw "User not found" // If the user is not found, throw an error
    return User // Return the user
}

export const findUserbyID = async (id: number) => {
    var User = await DB.users.find.id(id) // Find the user in the database
    if (!User) throw "User not found" // If the user is not found, throw an error
    return User // Return the user
}