import Login from "./connect/login.events";
import { MessageCreate } from "./messages";

export const sock = {
    login: Login,
    messageCreate: MessageCreate
}