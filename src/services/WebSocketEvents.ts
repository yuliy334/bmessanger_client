import type React from "react";
import type { Action } from "../hooks/ChatsStateContext";
import { getSocket } from "./WebSocketInicialization";
import type {chat} from "../types/chatsInfoTypes.ts"

export function NewChatEvent(dispatch: React.Dispatch<Action>) {

    const socket = getSocket();

    if (socket) {
        socket.on("newChat", (chat: chat) => {
            console.log("new chat works", chat);
            dispatch({ type: "add_chat", payload: chat })
        })
    }

}