import axios, { AxiosError } from "axios";
import { Socket } from "socket.io";
import dotenv from "dotenv";
import { utils } from "../../../utils";
import UTILS from "../../../../utils";
import ServerSocket from "../../..";
import Logger from "../../../../client/logger.client";
import { response } from "express";

dotenv.config();

export class FriendAddEvent {
    private socket: Socket;
       
    constructor(socket: Socket) {
        this.socket = socket;
    }

    public async run(friendID: number) {
        try {
            
            const response = await axios.get(`${process.env.BASE_URI}/api/v1/client/friends/add/${friendID}`, utils.set.bearer(ServerSocket.users[this.socket.id].token))
            if(!response.data) return ServerSocket.io.to(this.socket.id).emit("friendAdd", null)
            if(!response.data.data) return ServerSocket.io.to(this.socket.id).emit("friendAdd", null)
            Logger.debug("Friend add event from " + response.data.data)
            for(let user in ServerSocket.users) {
                console.log(ServerSocket.users[user].user_id + " " + friendID)
                if(ServerSocket.users[user].user_id == friendID) {
                    console.log("Friend request sent to " + ServerSocket.users[user].user_id)
                    ServerSocket.io.to(user).emit("friendRequestsReceived", UTILS.FUNCTIONS.REMOVE_PRIVATE_INFO_USER(ServerSocket.users[this.socket.id])) 
                    console.log(UTILS.FUNCTIONS.REMOVE_PRIVATE_INFO_USER(ServerSocket.users[this.socket.id]))
                }
            }
            return ServerSocket.io.to(this.socket.id).emit("friendAdd", response.data.data)
        } catch (err: unknown | AxiosError) {
            if(err instanceof AxiosError) 
            console.log("Error adding friend to user ", err.response?.data)
        }
    }
}