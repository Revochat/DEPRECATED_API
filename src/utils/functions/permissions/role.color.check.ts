export const checkRoleColor = (color: string) => {
    if (!color) return false;
    if (color.length !== 7) return false;
    if (color[0] !== "#") return false;
    if (!/^[0-9A-F]{6}$/i.test(color.slice(1))) return false;
    return true;
}