
import type { message } from "../../types/chatsInfoTypes";
import "./ChatItemStyle.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
interface ChatItemProps {
    chatName: string
    onClick: () => void;
    lastMessage?: message;
    chatStatus: string;
}

export function ChatItem({ chatName, onClick, lastMessage, chatStatus }: ChatItemProps) {
    return (
        <div className="ChatItem" onClick={onClick}>
            <div className="ChatItemHead">
                {chatStatus == "private" ? <AccountCircleIcon /> : <GroupsRoundedIcon />}
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