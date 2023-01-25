export const PERMISSIONS = {
    ADMIN: ["admin"],

    MEMBER: {
        INVITE: ["member", "invite"],
        REMOVE: ["member", "remove"], // kick
        BAN: ["member", "ban"],
        MANAGE: ["member", "manage"],
    },

    ROLES: {
        MANAGE: ["roles", "manage"],
        GIVE: ["roles", "give"],
    },

    CHANNELS: {
        MANAGE: ["channels", "manage"],
        VIEW: ["channels", "view"],
        SPEAK: ["channels", "speak"],
        VIDEO: ["channels", "video"],
        MOVE: ["channels", "move"],
    },

    MESSAGES: {
        SEND: ["messages", "send"],
        DELETE: ["messages", "delete"],
        MENTIONS: ["messages", "mentions"],
        SEND_FILES: ["messages", "send_files"],
    }
}