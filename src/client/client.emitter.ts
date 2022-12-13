import { EventEmitter } from "events";
import chalk from "chalk";

EventEmitter.defaultMaxListeners = 200;

export interface ClientEvents extends ClientEmitter {}

export class ClientEmitter extends EventEmitter {
    constructor() {
        super();
    }

    public logSuccess(message: string){
        console.log(chalk.green("[+]" + message));
    }

    public logFailed(message: string){
        console.log(chalk.red("[-]" + message));
    }

    public logInfo(message: string){
        console.log(chalk.blue("[*]" + message));
    }

    public logWarning(message: string){
        console.log(chalk.yellow("[!]" + message));
    }

    public logError(message: string){
        console.log(chalk.redBright("[x]" + message));
    }

    public logDebug(message: string){
        console.log(chalk.cyan("[debug]" + message));
    }
}

export default new ClientEmitter(); // Global Event Emitter