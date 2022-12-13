export default "./database.json"

export const config = { // This is the config file for the RevoAPI. You can change the port, the timeout, and the application name, version, description, and owners.
    application: {
        name: "RevoChat",
        version: "1.2.0",
        description: "RevoChat is a chat application that uses the RevoAPI to communicate with the server.",
        owners : [
            "ByLife",
            "Naywvi",
            "Thomas78125",
            "Lux",
            "Hocine",
            "StaiLee",
        ],
    }, 

    properties : {
        port: 3000,
        readyEventTimeout: 5000,
    }
}