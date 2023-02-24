import Logger from "../../client/logger.client"

module.exports = (command: string, args: Array<string>) => {
    if(args.length === 0) return Logger.error("This command requires arguments")
    console.log(args[0])
    switch(args[0]) {
        case "code":
            Logger.normal("Executing code...")
            // Execue the string as code
            eval(args.slice(1).join(" "))
            break;
        default:
            Logger.error("Invalid command")
            break;
    }
}