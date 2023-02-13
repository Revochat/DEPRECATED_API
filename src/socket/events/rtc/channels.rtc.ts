import { Socket } from "socket.io"
import ServerSocket from "../.."
import Logger from "../../../client/logger.client"
import DB from "../../../database"


export class ChannelRTCEvent {
    private socket: Socket
    constructor(socket: Socket){
        this.socket = socket
    }

    public async run(token: string){
        try {
            if(!this.socket.id) throw new Error("Socket not found")
            const rtc = new RTCPeerConnection()
            rtc.onicecandidate = (event) => {
                if(event.candidate) {
                    ServerSocket.io.to(this.socket.id).emit("iceCandidate", event.candidate)
                }
            }
            rtc.oniceconnectionstatechange = (event) => {
                if(rtc.iceConnectionState === "disconnected") {
                    ServerSocket.io.to(this.socket.id).emit("iceDisconnected")
                }
            }
            rtc.ontrack = (event) => {
                ServerSocket.io.to(this.socket.id).emit("track", event.track)
            }
            rtc.onnegotiationneeded = (event) => {
                rtc.createOffer().then((offer) => {
                    rtc.setLocalDescription(offer)
                    ServerSocket.io.to(this.socket.id).emit("negotiationNeeded", offer)
                })
            }
        }
        catch(err) {
            Logger.error(err)
        }
    }
}