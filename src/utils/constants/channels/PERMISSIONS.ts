export const PERMISSIONS = { // Channel permissions path constant (array is the path to the permission in the database model) NEED TO UPDATE THE PERMISSIONS AND DATABASE MODEL TOGETHER
    ADMIN: ["admin"],
    VIEW: ["view"],
    MEMBER: {
        INVITE: ["member", "invite"],
        REMOVE: ["member", "remove"],
    },
    MESSAGE: {
        SEND: ["message", "send"],
        MENTIONS: ["message", "mentions"],
        SEND_FILES: ["message", "send_files"],
    },

    ALL: ["admin", "view", "member", "message", "invite", "remove", "send", "mentions", "send_files"]
};