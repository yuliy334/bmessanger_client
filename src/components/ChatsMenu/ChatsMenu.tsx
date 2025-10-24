import { IconButton } from "@mui/material";
import { deleteSession } from "../../services/WebSocketFunctions";
import LogoutIcon from '@mui/icons-material/Logout';
import ControlledOpenSpeedDial from "../materialUIComponents/ControlledOpenSpeedDial";
import "./ChatsMenuStyle.css"
import { useContext } from "react";
import { ChatsContext } from "../../hooks/ChatsStateContext";
import { ChatItem } from "../ChatItem/ChatItem";
import type { openChatInfo } from "../../types/openChatInfoTypes";

interface ChatProps {
    setNewPersonalChat: React.Dispatch<React.SetStateAction<boolean>>;
    setNewGroupChat: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenChatInfo: React.Dispatch<React.SetStateAction<openChatInfo>>;
}
export function Chats({ setNewPersonalChat, setOpenChatInfo,setNewGroupChat }: ChatProps) {
    const chatsContext = useContext(ChatsContext);
    if (!chatsContext) {
        throw new Error("NoChatContext");
    }
    const { state, dispatch } = chatsContext;

    function handleChat(id:number,type:string){
        setOpenChatInfo({
            isOpen:true,
            id:id,
            type:type
        
        });
        console.log("type: ",type);
        setNewPersonalChat(false);
        setNewGroupChat(false);

    }


    return (
        <div className="chats">
            <div className="chatBar">
                <span>chats</span>
                <IconButton color="primary" onClick={deleteSession} aria-label="delete" sx={{ color: 'black', marginRight: "10px" }}>
                    <LogoutIcon />
                </IconButton>

            </div>
            <div className="ChatsList">

                {state.chats.map((c) => (
                    
                    <ChatItem key={c.id} chatStatus={c.type} lastMessage={c.messages.at(0)} chatName={c.chatName} onClick={() => handleChat(c.id, c.type) } />
                ))}</div>
            <div className="addChatContainer">

                <ControlledOpenSpeedDial setNewGroupChat={setNewGroupChat} setNewPersonalChat={setNewPersonalChat}  setOpenChatInfo={setOpenChatInfo}/>
            </div>
        </div>
    )
}