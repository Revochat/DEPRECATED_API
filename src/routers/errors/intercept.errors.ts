import express from "express"
import { RouteResponse, Status } from "../controller"

export const ErrorIntercept = {
    ERR404 : (_: any, response: express.Response | null): void => { // Error handler
        if(response != null) response.status(404)
        // Emitter.emit("error", req.header('x-forwarded-for') || req.connection.remoteAddress)
        response == null ? new Error("Unauthorized function manipulation") : 
        response.json(
            new RouteResponse()
                .setStatus(Status.error)
                .setMessage("Unauthorized")
        )
    }
}