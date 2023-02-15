import { Socket } from "socket.io"
import ServerSocket from "../.."
import Logger from "../../../client/logger.client"
import DB from "../../../database"
const { RTCPeerConnection } = require("wrtc")

export class CallEvent {
    private socket: Socket
    constructor(socket: Socket){
        this.socket = socket
    }

    public async run(candidate_id: number){
        try {
            if(!this.socket.id) throw new Error("Socket not found")
            Logger.debug("Call user " + candidate_id + " from " + this.socket.id)
            var candidate: any | null = null;
            for(let user in ServerSocket.users) {
                if(ServerSocket.users[user].user_id == candidate_id) {
                    candidate = ServerSocket.users[user]
                }
            }

            if(candidate == null) throw new Error("Candidate not found")

            const rtc = new RTCPeerConnection()
            console.log(rtc)
            rtc.onicecandidate = (event: any) => {
                if(event.candidate) {
                    ServerSocket.io.to([this.socket.id,candidate.id]).emit("iceCandidate", event.candidate)
                    Logger.debug("Send iceCandidate to " + candidate.id)
                }
            }
            rtc.oniceconnectionstatechange = () => {
                if(rtc.iceConnectionState === "disconnected") {
                    ServerSocket.io.to([this.socket.id,candidate.id]).emit("iceDisconnected")
                    Logger.debug("Send iceDisconnected to " + candidate.id)
                }
            }
            rtc.ontrack = (event: any) => {
                ServerSocket.io.to([this.socket.id,candidate.id]).emit("track", event.track)
            }
            rtc.onnegotiationneeded = (event: any) => {
                rtc.createOffer().then((offer: any) => {
                    rtc.setLocalDescription(offer)
                    ServerSocket.io.to([this.socket.id,candidate.id]).emit("negotiationNeeded", offer)
                    Logger.debug("Send negotiationNeeded to " + candidate.id)
                })
            }

        }
        catch(err) {
            Logger.error(err)
        }
    }
}