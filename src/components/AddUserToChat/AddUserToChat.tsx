import type React from "react";
import "./AddUserToChatStyle.css"
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import type { user } from "../../types/chatsInfoTypes";
import toast, { Toaster } from "react-hot-toast";
import { AddUserToChatFunc, IsUserExist } from "../../services/WebSocketFunctions";

interface AddUserToChatProps {
    chatId: number;
    setIsAddUserOpen: React.Dispatch<boolean>;
    chatUsers: user[];
}

export function AddUserToChat({ setIsAddUserOpen, chatUsers, chatId }: AddUserToChatProps) {
    const [username, setUsername] = useState<string>("");
    async function AddUserHandle() {
        let isExistInChat = false;
        chatUsers.forEach((user) => {
            if (user.username == username) {
                isExistInChat = true;
                toast.error("user alredy in the chat");
                return;
            }

        })
        if (!isExistInChat) {
            const UserExistanse = await IsUserExist(username);
            if (UserExistanse?.IsExist) {
                await AddUserToChatFunc(chatId,username);
                setIsAddUserOpen(false);
            }
            else{
                toast.error("user does not exist");
                return;
            }

        }
    }
    return (
        <div className="AddUserContainer">
            <Toaster position="top-right" />
            <CloseIcon className="closebutton" onClick={() => setIsAddUserOpen(false)} />

            <div className="AddUser">
                <input onChange={(e) => { setUsername(e.target.value) }}></input>
                <button onClick={AddUserHandle}>add</button>
            </div>
        </div>
    )
}