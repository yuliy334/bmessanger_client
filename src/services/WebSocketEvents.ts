import type React from "react";
import type { Action } from "../hooks/ChatsStateContext";
import { getSocket } from "./WebSocketInicialization";
import type { chat, message } from "../types/chatsInfoTypes.ts"
import { Socket } from "socket.io-client";
import type { AddedUserAnswer } from "../types/WebSocketTypes.ts";

export function NewChatEvent(dispatch: React.Dispatch<Action>) {

    const socket = getSocket();

    if (socket) {
        socket.on("newChat", (chat: chat) => {
            console.log("new chat works", chat);
            dispatch({ type: "add_chat", payload: chat })
        })
    }

}
export function NewMessageEvent(dispatch: React.Dispatch<Action>) {

    const socket = getSocket();

    if (socket) {
        socket.on("newRecivedMessage", (message: message) => {
            console.log("new message", message);
            dispatch({ type: "set_message", payload: message })
        })
    }

}
export function UserAdded(dispatch: React.Dispatch<Action>){
    const socket = getSocket();
    if(socket){
        socket.on("UserAdded", (message:AddedUserAnswer) =>{
            dispatch({type:"add_user", payload:message});
            console.log(message);
        })
    }
}

export function ChatDeleted(dispatch: React.Dispatch<Action>){
    const socket = getSocket();
    if(socket){
        socket.on("DeleteChat", (chatId:number) =>{
            dispatch({type:"delete_chat", payload:chatId});
            console.log(chatId);
        })
    }
}