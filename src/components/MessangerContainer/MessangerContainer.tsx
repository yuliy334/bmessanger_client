import "./MessangerContainerStyle.css"
import { useContext, useEffect, useState } from "react";
import { getSocket, initSocket } from "../../services/WebSocketInicialization";
import { Chats } from "../ChatsMenu/ChatsMenu";
import { MessagesContainer } from "../MessagesContainer/MessagesContainer";
import type { chat, Info } from "../../types/chatsInfoTypes";
import { ChatsContext } from "../../hooks/ChatsStateContext";
import type { openChatInfo } from "../../types/openChatInfoTypes";
import { getAllChats } from "../../services/WebSocketFunctions";



export function MessangerContainer() {

    const chatsContext = useContext(ChatsContext);
    if (!chatsContext) {
        throw new Error("NoChatContext");
    }
    const { state, dispatch } = chatsContext;
    const [IsNewPersonalChat, setNewPersonalChat] = useState<boolean>(false);
    const [IsNewGroupChat, setNewGroupChat] = useState<boolean>(false);
    const [OpenChatInfo, setOpenChatInfo] = useState<openChatInfo>({ isOpen: false, id: -1 });
    const [ChatTitle, setChatTitle] = useState<string|null>(null);

    useEffect(() => {
        initSocket();
        getAllChats(dispatch);
        const socket = getSocket();
        if (socket) {
            // socket.emit("getAllChats", (response: Info) => {
            //     dispatch({
            //         type: "set_chats", payload: {
            //             username: response.username,
            //             chats: response.chats,
            //         }
            //     });
            //     console.log(response.chats);
            // })
            socket.on("newChat", (chat: chat) => {
                console.log("new chat works", chat);
                dispatch({ type: "add_chat", payload: chat })
            })
        }


    }, []);

    useEffect(()=>{
        if(OpenChatInfo.isOpen){
            for(const SchatItem of state.chats){
                if(SchatItem.id == OpenChatInfo.id){
                    setChatTitle(SchatItem.chatName)
                }
            }
        }
    },[OpenChatInfo]);


    return (
        <div className="MessangerContainer">
            <Chats setNewPersonalChat={setNewPersonalChat} setOpenChatInfo={setOpenChatInfo} />
            <MessagesContainer chatName={ChatTitle??"choose a chat"} IsNewPersonalChat={IsNewPersonalChat} IsNewGroupChat={IsNewGroupChat} OpenChatInfo={OpenChatInfo} />
        </div>
    )
}