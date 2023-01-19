import { create_group } from "./channels.create.group";
import { create_private } from "./channels.create.private";
import { create_server } from "./channels.create.server";

export const create = {
    group: create_group,
    private: create_private,
    server: create_server
}