import { useContext, useEffect, useState } from "react";
import "./MessageStyle.css";
import { ChatsContext } from "../../hooks/ChatsStateContext";
import type { message } from "../../types/chatsInfoTypes";


interface MessageProps {
    messageData:message;
}

export function Message({ messageData }: MessageProps) {
    const [WhosMessage, setWhoseMessage] = useState<string>("MessageContainer NotMyMessage")
    const chatsContext = useContext(ChatsContext);
    if (!chatsContext) {
        throw new Error("NoChatContext");
    }
    const { state } = chatsContext;

    useEffect(() => {
        if (state.username == messageData.senderName) {
            setWhoseMessage("MessageContainer MyMessage");
        }
    }, [])
    return (
        <div className={WhosMessage}>
            <p className="MessageSender">{messageData.senderName}</p>
            <p className="Message">{messageData.text}</p>
            <p className="time">{new Date(messageData.createdAt).toTimeString().split(' ')[0]}</p>
        </div>
    )
}