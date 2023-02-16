import UTILS from "../.."

export const checkIntegrity = async (permissions: any) => { // check integrity of permissions of a channel
    const PERMISSIONS = UTILS.CONSTANTS.CHANNEL.PERMISSIONS.ALL
    const keys = Object.keys(permissions)
    if (keys.length !== PERMISSIONS.length) return false
    for (let i = 0; i < keys.length; i++) {
        if (!PERMISSIONS.includes(keys[i])) return false

        const permission = permissions[keys[i]]
        const permissionKeys = Object.keys(permission)
        for (let j = 0; j < permissionKeys.length; j++) {
            if (!["roles_id", "user_id"].includes(permissionKeys[j])) return false
            if (!Array.isArray(permission[permissionKeys[j]])) return false
            for (let k = 0; k < permission[permissionKeys[j]].length; k++) {
                if (typeof permission[permissionKeys[j]][k] !== "number") return false
            }
        }
    }
    return true
}