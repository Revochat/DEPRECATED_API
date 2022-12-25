import User, {IUserModel} from "../models/User";

export async function UserCreate(user: IUserModel) {
    return User.create(user);
}