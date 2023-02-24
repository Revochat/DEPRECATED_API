import Logger from "../../client/logger.client";

module.exports = (command: string, args: Array<string>) => {
    let validArgs = {
        "lookup" : [
            "id",
            "token"
        ], 
        "kick": [
            "id",
            "token"
        ], 
        "ban": [
            "id",
            "token"
        ], 
        "unban": [
            "id",
            "token"
        ], 
        "socket": [
            "user_id",
            "token",
            "socket_id"
        ]
    }
    if(args.length === 0) return Logger.error("This command requires arguments" + validArgs)
    switch(args[0]) {
        case "socket":
            if(args.length < 2) return Logger.error("Specify a user to lookup")
            switch(args[1]) {
                case "user_id":
                  
                    break;
        case "kick":
            if(args.length < 2) return Logger.error("Specify a user to kick")
            break;
        case "ban":
            if(args.length < 2) return Logger.error("Specify a user to ban")
            break;
        case "unban":
            if(args.length < 2) return Logger.error("Specify a user to unban")
            break;
        default:
            Logger.error("Invalid command")
            break;
    }
}