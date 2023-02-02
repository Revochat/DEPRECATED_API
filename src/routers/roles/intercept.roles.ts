import {createRole} from "./roles.create";
import {removeRole} from "./roles.remove";
import {getRole} from "./roles.get";
// import * from "./roles.list";
// import * from "./roles.update";

export const RolesIntercept = {
    create: createRole,
    remove: removeRole,
    get: getRole,  
}