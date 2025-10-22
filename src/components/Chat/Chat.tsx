import { useContext, useState } from "react";
import { Message } from "../Message/Message";
import { MessangerContainer } from "../MessangerContainer/MessangerContainer";
import "./ChatStyle.css";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { SendMesssage } from "../../services/WebSocketFunctions";
import type { messageSend } from "../../types/messageSendType";
import { ChatsContext } from "../../hooks/ChatsStateContext";
import type { message } from "../../types/chatsInfoTypes";

interface ChatProps {
    ChatId: number;
}

export function Chat({ ChatId }: ChatProps) {
    const [messsageText, setMessageText] = useState<string>("");
    const chatsContext = useContext(ChatsContext);
    if (!chatsContext) {
        throw new Error("NoChatContext");
    }
    const { state, dispatch } = chatsContext;
    const ChatMessagesId = state.chats.findIndex((a) => a.id == ChatId);
    console.log(ChatMessagesId);
    async function SendHandel() {
        const messageBody: messageSend = { text: messsageText, chatId: ChatId };
        const NewMessage = await SendMesssage(messageBody);
        console.log("dsfsfs", NewMessage);
    }
    return (
        <div className="ChatContainer">
            <div className="Messages">
                {state.chats[ChatMessagesId].messages.map((m: message) => (<Message key={m.createdAt.toString() + m.senderName} messageData={m} />))}



            </div>
            <div className="WriteMessage">
                <form className="SendMessageForm">
                    <input onChange={(e) => setMessageText(e.target.value)} className="InputMessage">
                    </input>
                    <div onClick={SendHandel}>
                        <SendRoundedIcon className="send-icon" />
                    </div>
                </form>
            </div>
        </div>
    )
}