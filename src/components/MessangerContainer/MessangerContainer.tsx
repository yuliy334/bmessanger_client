import "./MessangerContainerStyle.css"
import { useContext, useEffect, useReducer, useState } from "react";
import { getSocket, initSocket } from "../../services/WebSocketInicialization";
import { Chats } from "../Chats/Chats";
import { Messages } from "../Messages/Messages";
import type { chat, chats } from "../../types/chatsInfoTypes";
import { ChatsContext, ChatsProvider } from "../../hooks/ChatsStateContext";

export function MessangerContainer() {

    const chatsContext = useContext(ChatsContext);
    if (!chatsContext) {
        throw new Error("NoChatContext");
    }
    const { state, dispatch } = chatsContext;
    const [IsNewPersonalChat, setNewPersonalChat] = useState<boolean>(false);

    useEffect(() => {
        initSocket();

        const socket = getSocket();
        if (socket) {
            console.log("it works1");
            socket.emit("getAllChats", (response: any) => {
                const formattedChats: chat[] =
                    response.map((c: any) => ({
                        chatName: c.chatName,
                        id: c.id,
                        messages: c.messages.map((m: any) => ({
                            senderName: m.senderName,
                            text: m.text
                        })),
                        type: c.type,
                        users: c.users.map((u: any) => ({
                            username: u.username
                        }))
                    }))
                console.log(response);


                dispatch({ type: "set_chats", payload: formattedChats });
                console.log(state);
            })
            socket.on("newChat", (chat: any) => {
                console.log("sdfsdfsdfsd_1");
                const formmatedChat: chat = {
                    chatName: chat.chatName, id: chat.id, messages: chat.messages.map((m: any) => ({
                        senderName: m.senderName,
                        text: m.text
                    })),
                    type: chat.type, users: chat.users.map((u: any) => ({
                        username: u.username
                    }))
                }
                dispatch({ type: "add_chat", payload: formmatedChat })
            })
        }


    }, []);
    return (
        <div className="MessangerContainer">
            <Chats setNewPersonalChat={setNewPersonalChat} ChatState={state} />
            <Messages chatName="sdfs" IsNewPersonalChat={IsNewPersonalChat} />
        </div>
    )
}