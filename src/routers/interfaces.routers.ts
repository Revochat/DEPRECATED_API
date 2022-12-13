import express from 'express'
import { Server } from 'http'

export enum Status { // This is the enum that is used to create the status response
    'success' = 'success',
    'error' = 'error',
    'warning' = 'warning',
    'info' = 'info',
    'failed' = 'failed'
}

export type SuccessString<TEnum extends string> = // This is the type that is used to create the success response
    { [key in string]: TEnum | string; }

export interface Route { // This is the interface that is used to create the route
    path: string,
    response?: Function | null
    callback?: Function | null
}


export interface InterceptRoute { // This is the interface that is used to create the response
    status: Status,
    message: string,
    data?: InterceptRoute_Channel | InterceptRoute_Connect | InterceptRoute_Error | InterceptRoute_Messages
}

export interface InterceptRoute_Connect { // This is the interface that is used to create the connect response
    _from: string,
}

export interface InterceptRoute_Error { // This is the interface that is used to create the error response
    _from: string,
}

export interface InterceptRoute_Channel { // This is the interface that is used to create the channel response
    _from: string,
    channel: string,
}

export interface InterceptRoute_Messages { // This is the interface that is used to create the messages response
    _from: string,
    _to: string,
}

export interface Routes extends Array<Route>{} // This is the interface that is used to create the routes

export const RouteResponse = new class RouteResponse implements InterceptRoute { // This is the class that is used to create the response
    public status!: Status
    public message!: string
    public data?: InterceptRoute_Channel | InterceptRoute_Connect | InterceptRoute_Error | InterceptRoute_Messages
    setStatus(status: Status): this {
        this.status = status
        return this
    }
    setMessage(message: string): this {
        this.message = message
        return this
    }
    setData(data: InterceptRoute_Channel | InterceptRoute_Connect | InterceptRoute_Error | InterceptRoute_Messages): this {
        this.data = data
        return this
    }
}

export interface RouterInterface {  // This is the interface that is used to create the router
    start: () => void;
    reload: () => void;
    stop: () => void;
}