import { EventEmitter } from "events";
import chalk from "chalk";

EventEmitter.defaultMaxListeners = 200;

export interface ClientEvents extends ClientEmitter {}

export class ClientEmitter extends EventEmitter {
    constructor() {
        super();
    }
}

export default  new ClientEmitter; // Global Event Emitter