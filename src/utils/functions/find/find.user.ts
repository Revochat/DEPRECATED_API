import DB from "../../../database/"

export const findUser = async (token: string) => {
    var User = await DB.users.find.token(token)
    if(!User) throw "User not found"
    return User
}