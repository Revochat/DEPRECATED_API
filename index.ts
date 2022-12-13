import Client, { ClientEvents, RouterInterface, DatabaseInterface} from "./src";

Client.on("ready", (routes: RouterInterface, database: DatabaseInterface) => {
    console.log("On est prêt !")
    console.log("Tu peux utiliser les routes et la base de données !")
    console.log(routes.reload()) // par exemple je reload les routes quand je veux et quand tout est pret à fonctionner
})

Client.on("error", (error: Error | string) => {
    console.log("Sa log l'erreur quand un mec cherche une route qui existe pas (son ip)")
    console.log(error)
})

Client.on("connect", (client: string) => {
    console.log("Sa log quand un mec se connecte (l'interface ClientEvents y'a ip, publicAddress, etc...)")
    console.log(client)
})

Client.on("channel", token => {
    console.log("channel tok :" + token)
})