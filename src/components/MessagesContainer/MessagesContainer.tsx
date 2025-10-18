import { Chat } from "../Chat/Chat";
import { NewChat } from "../NewChat/NewChat";
import "./MessagesContainerStyle.css"

interface MessagesProps {
    chatName: string;
    IsNewPersonalChat: boolean;
    IsNewGroupChat: boolean;
    IsOpenChat: boolean;
}

export function Messages({ chatName, IsNewPersonalChat, IsOpenChat, IsNewGroupChat }: MessagesProps) {
    const title = IsNewPersonalChat ? "create new personal chat" : IsNewGroupChat ? "create new group chat" : chatName;
    return (
        <div className="messagesContainer">
            <div className="ChatInfo">
                <span className="ChatName"> {title}</span>
            </div>
            <div className="ChatBody">
                {IsNewPersonalChat && <NewChat />}
                {IsOpenChat && <Chat />}
            </div>

        </div>
    )
}