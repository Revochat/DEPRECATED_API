import User, {IUser} from "../models/User";

export async function UserCreate(user: IUser) {
    return User.create(user);
}