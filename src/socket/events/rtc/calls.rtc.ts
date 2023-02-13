import { Socket } from "socket.io"
import ServerSocket from "../.."
import Logger from "../../../client/logger.client"
import DB from "../../../database"


export class CallEvent {
    private socket: Socket
    constructor(socket: Socket){
        this.socket = socket
    }

    public async run(candidate_id: number){
        try {
            if(!this.socket.id) throw new Error("Socket not found")

            var candidate: any | null = null;
            for(let user in ServerSocket.users) {
                if(ServerSocket.users[user].user_id == candidate_id) {
                    candidate = ServerSocket.users[user]
                }
            }

            if(candidate == null) throw new Error("Candidate not found")

            const rtc = new RTCPeerConnection()
            rtc.onicecandidate = (event) => {
                if(event.candidate) {
                    ServerSocket.io.to([this.socket.id,candidate.id]).emit("iceCandidate", event.candidate)
                }
            }
            rtc.oniceconnectionstatechange = (event) => {
                if(rtc.iceConnectionState === "disconnected") {
                    ServerSocket.io.to([this.socket.id,candidate.id]).emit("iceDisconnected")
                }
            }
            rtc.ontrack = (event) => {
                ServerSocket.io.to([this.socket.id,candidate.id]).emit("track", event.track)
            }
            rtc.onnegotiationneeded = (event) => {
                rtc.createOffer().then((offer) => {
                    rtc.setLocalDescription(offer)
                    ServerSocket.io.to([this.socket.id,candidate.id]).emit("negotiationNeeded", offer)
                })
            }

        }
        catch(err) {
            Logger.error(err)
        }
    }
}