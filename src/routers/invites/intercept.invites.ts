import { inviteCreate } from "./invites.create"
import { inviteRemove } from "./invites.remove"
import { inviteUse } from "./invites.use"
import { inviteGet } from "./invites.get"


export const InvitesIntercept = {
    create: inviteCreate,
    remove: inviteRemove,
    use: inviteUse,
    get: inviteGet
}