
import type { message } from "../../types/chatsInfoTypes";
import "./ChatItemStyle.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
interface ChatItemProps {
    chatName: string
    onClick: () => void;
    lastMessage?: message;
}

export function ChatItem({ chatName, onClick, lastMessage }: ChatItemProps) {
    console.log(lastMessage);
    return (
<div className="ChatItem" onClick={onClick}>
        <div className="ChatItemHead">
            <AccountCircleIcon />
            <span>{chatName}</span>
        </div>
        {lastMessage && (
            <div className="lastMessage">
                {`${lastMessage.senderName}: ${lastMessage.text}`}
            </div>
        )}
    </div>

    )
}