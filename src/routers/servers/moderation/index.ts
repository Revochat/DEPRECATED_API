import {userBan} from "./servers.user.ban"
import {userKick} from "./servers.user.kick"
import {userUnban} from "./servers.user.unban"
import {userTimeout} from "./servers.user.timeout"
import {userUnTimeout} from "./servers.user.untimeout"

export const user = {
    ban: userBan,   
    kick: userKick,
    unban: userUnban,
    timeout: userTimeout,
    untimeout: userUnTimeout
}
