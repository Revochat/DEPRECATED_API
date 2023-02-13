import { avatarUpdate } from "./users.avatar.update";
import { passwordUpdate } from "./users.password.update";
import { usernameUpdate } from "./users.username.update";
import { walletUpdate } from "./users.wallet.update";
import { statusUpdate } from "./users.status.update";
import { channelsUpdate } from "./users.channels.update";
import { serversUpdate } from "./users.servers.update";

export const update = {
    username: usernameUpdate,
    password: passwordUpdate,
    avatar: avatarUpdate,
    wallet_token: walletUpdate,
    status: statusUpdate,
    channels: channelsUpdate,
    servers: serversUpdate
};