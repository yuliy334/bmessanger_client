import type { openChatInfo } from "../../types/openChatInfoTypes";
import { Chat } from "../Chat/Chat";
import { NewGroupChat } from "../NewGroupChat/NewGroupChat";
import { NewPersonalChat } from "../NewPersonalChat/NewPersonalChat";
import "./MessagesContainerStyle.css"

interface MessagesProps {
    chatName: string;
    IsNewPersonalChat: boolean;
    IsNewGroupChat: boolean;
    OpenChatInfo: openChatInfo;
}

export function MessagesContainer({ chatName, IsNewPersonalChat, OpenChatInfo, IsNewGroupChat }: MessagesProps) {
    const title = IsNewPersonalChat ? "create new personal chat" : IsNewGroupChat ? "create new group chat" : chatName;
    return (
        <div className="messagesContainer">
            <div className="ChatInfo">
                <span className="ChatName"> {title}</span>
            </div>
            <div className="ChatBody">
                {IsNewPersonalChat && <NewPersonalChat />}
                {IsNewGroupChat && <NewGroupChat/>}
                {OpenChatInfo.isOpen && <Chat ChatId={OpenChatInfo.id}/>}
            </div>

        </div>
    )
}