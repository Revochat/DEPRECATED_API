import Logger from "../../client/logger.client"
import { config } from "../../config"

module.exports = (command: string, args: string) => {
    Logger.normal(config.ascii.art)
}