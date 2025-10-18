import "./ChatStyle.css";
import SendRoundedIcon from '@mui/icons-material/SendRounded';

export function Chat() {
    return (
        <div className="ChatContainer">
            <div className="Messages"></div>
            <div className="WriteMessage">
                <form className="SendMessageForm">
                    <input className="InputMessage">
                    </input>
                    <SendRoundedIcon className="send-icon"/>
                </form>
            </div>
        </div>
    )
}