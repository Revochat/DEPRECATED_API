import Client, {RouterInterface, DatabaseInterface} from "./src";

Client.on("ready", (routes: RouterInterface, database: DatabaseInterface) => {
    console.log("API is ready to use")
    // console.log(routes.reload()) // reload the routes to add new routes or remove old routes
})

Client.on("error", (error: Error | string) => { // Error handler no route found
    console.log(error)
})

Client.on("connect", (username: string, password: string) => { // Connect a user
    console.log(username, password)
})

Client.on("register", (username: string, password: string) => {}) // Register a new user
