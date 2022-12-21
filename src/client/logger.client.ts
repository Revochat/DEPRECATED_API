import chalk from "chalk";

export default class Logger {
    public static info = (args: any) => console.log(chalk.blueBright(`[${new Date().toLocaleString()}] [INFO]`), typeof args === "string" ? chalk.blueBright(args) : args);
    public static warn = (args: any) => console.log(chalk.yellowBright(`[${new Date().toLocaleString()}] [WARN]`), typeof args === "string" ? chalk.yellowBright(args) : args);
    public static error = (args: any) => console.log(chalk.redBright(`[${new Date().toLocaleString()}] [ERROR]`), typeof args === "string" ? chalk.redBright(args) : args);
    public static debug = (args: any) => console.log(chalk.greenBright(`[${new Date().toLocaleString()}] [DEBUG]`), typeof args === "string" ? chalk.greenBright(args) : args);
    public static success = (args: any) => console.log(chalk.greenBright(`[${new Date().toLocaleString()}] [SUCCESS]`), typeof args === "string" ? chalk.greenBright(args) : args);
    public static log = (args: any) => console.log(chalk.whiteBright(`[${new Date().toLocaleString()}] [LOG]`), typeof args === "string" ? chalk.whiteBright(args) : args);
}