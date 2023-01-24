import { avatarUpdate } from "./users.avatar.update";
import { passwordUpdate } from "./users.password.update";
import { usernameUpdate } from "./users.username.update";
import { walletUpdate } from "./users.wallet.update";
import { statusUpdate } from "./users.status.update";

export const update = {
    username: usernameUpdate,
    password: passwordUpdate,
    avatar: avatarUpdate,
    wallet_token: walletUpdate,
    status: statusUpdate,
};