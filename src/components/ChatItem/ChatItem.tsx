
import "./ChatItemStyle.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
interface ChatItemProps{
    chatName:string
}

export function ChatItem({chatName}:ChatItemProps){
    return(
        <div className="ChatItem">
            <AccountCircleIcon />
            <span>{chatName}</span>
        </div>
    )
}