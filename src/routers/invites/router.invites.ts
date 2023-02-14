import { InvitesIntercept } from "./intercept.invites"

export const InvitesRouter = {
    path: "/invites",

    create: {
        name: "createInvite",
        method: "POST",
        socketing: false,
        description: "Create an invite for a server",
        path: "/create/:server_id",
        params: ["token", "server_id", "max_uses", "expires_at"],
        res: InvitesIntercept.create
    },

    remove: {
        name: "removeInvite",
        method: "GET",
        socketing: false,
        description: "Remove an invite",
        path: "/remove/:invite_id",
        params: ["token", "invite_id"],
        res: InvitesIntercept.remove
    },

    use: {
        name: "useInvite",
        method: "GET",
        socketing: false,
        description: "Use an invite",
        path: "/use/:invite_id",
        params: ["token", "invite_id"],
        res: InvitesIntercept.use
    },

    get: {
        name: "getInvite",
        method: "GET",
        socketing: false,
        description: "Get an invite",
        path: "/get/:invite_id",
        params: ["token", "invite_id"],
        res: InvitesIntercept.get
    }
}