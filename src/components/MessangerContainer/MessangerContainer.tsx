import "./MessangerContainerStyle.css"
import { useContext, useEffect, useState } from "react";
import { getSocket, initSocket } from "../../services/WebSocketInicialization";
import { Chats } from "../ChatsMenu/ChatsMenu";
import { ChatContainer } from "../ChatContainer/ChatContainer";
import type { chat, Info, user } from "../../types/chatsInfoTypes";
import { ChatsContext } from "../../hooks/ChatsStateContext";
import type { openChatInfo } from "../../types/openChatInfoTypes";
import { getAllChats } from "../../services/WebSocketFunctions";
import { ChatDeleted, NewChatEvent, NewMessageEvent, UserAdded, UserDeleted } from "../../services/WebSocketEvents";



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
    const [UsersInOpenChat, setUsersInOpenChat] = useState<user[]>([]);

    useEffect(() => {
        initSocket();
        getAllChats(dispatch);
        NewChatEvent(dispatch);
        NewMessageEvent(dispatch);
        UserAdded(dispatch);
        ChatDeleted(dispatch);
        UserDeleted(dispatch);
    }, []);

    useEffect(()=>{
        if(OpenChatInfo.isOpen){
            for(const SchatItem of state.chats){
                if(SchatItem.id == OpenChatInfo.id){
                    setChatTitle(SchatItem.chatName)
                    setUsersInOpenChat(SchatItem.users);
                }
            }
        }
    },[OpenChatInfo]);


    return (
        <div className="MessangerContainer">
            <Chats setNewGroupChat={setNewGroupChat} setNewPersonalChat={setNewPersonalChat} setOpenChatInfo={setOpenChatInfo} />
            <ChatContainer chatUsers={UsersInOpenChat} chatName={ChatTitle??"choose a chat"} IsNewPersonalChat={IsNewPersonalChat} IsNewGroupChat={IsNewGroupChat} OpenChatInfo={OpenChatInfo} />
        </div>
    )
}