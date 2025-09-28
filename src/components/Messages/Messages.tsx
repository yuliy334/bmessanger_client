import { NewChat } from "../NewChat/NewChat";
import "./MessagesStyle.css"

interface MessagesProps {
    chatName: string;
    IsNewPersonalChat: boolean;
    IsNewGroupChat?: boolean;
}

export function Messages({ chatName, IsNewPersonalChat }: MessagesProps) {
    return (
        <div className="messagesContainer">
            <div className="ChatInfo">
                <span className="ChatName"> {chatName}</span>
            </div>
            {IsNewPersonalChat && <NewChat />}
        </div>
    )
}