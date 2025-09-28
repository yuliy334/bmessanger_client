import { IconButton } from "@mui/material";
import { deleteSession } from "../../services/WebSocketFunctions";
import LogoutIcon from '@mui/icons-material/Logout';
import ControlledOpenSpeedDial from "../materialUIComponents/ControlledOpenSpeedDial";
import "./ChatsStyle.css"
import { useContext } from "react";
import { ChatsContext } from "../../hooks/ChatsStateContext";
import { ChatItem } from "../ChatItem/ChatItem";

interface ChatProps {
    setNewPersonalChat: React.Dispatch<React.SetStateAction<boolean>>;
}
export function Chats({ setNewPersonalChat }: ChatProps) {
    const chatsContext = useContext(ChatsContext);
    if (!chatsContext) {
        throw new Error("NoChatContext");
    }
    const { state, dispatch } = chatsContext;

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
                <ChatItem key={c.id} chatName={c.chatName}/>
            ))}</div>
            <div className="addChatContainer">

                <ControlledOpenSpeedDial setNewPersonalChat={setNewPersonalChat} />
            </div>
        </div>
    )
}