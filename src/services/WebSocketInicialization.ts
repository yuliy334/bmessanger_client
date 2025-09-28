// services/socket.ts
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function initSocket() {
    try {
        if (!socket) {
            socket = io("http://localhost:3000", {
                withCredentials: true,
            });
        }


        return socket;
    } catch (err) {
        console.error("error in inicialization WebSocket:", err);
        return null;
    }
}

export function getSocket(): Socket | null {
    return socket;
}

export function destroySocket(){
    socket?.disconnect;
    socket = null;
}
