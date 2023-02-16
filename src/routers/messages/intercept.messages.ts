import { send } from "./message.send"
import { remove } from "./message.remove"
import { get } from "./message.get"

export const MessagesIntercept = {
    get: get,
    send: send,
    remove: remove
}