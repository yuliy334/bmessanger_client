
import "./ChatItemStyle.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
interface ChatItemProps{
    chatName:string
    onClick:() => void;
}

export function ChatItem({chatName, onClick}:ChatItemProps){
    return(
        <div className="ChatItem" onClick={onClick}>
            <AccountCircleIcon />
            <span>{chatName}</span>
        </div>
    )
}