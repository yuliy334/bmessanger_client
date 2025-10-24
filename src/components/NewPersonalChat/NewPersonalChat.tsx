import { TextField, Button } from "@mui/material";
import "./NewPersonalChatStyle.css"
import { CreatePrivateChat } from "../../services/WebSocketFunctions";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import type { creatingChatAnswer } from "../../types/WebSocketTypes";
export function NewPersonalChat() {
    const [username, setUsername] = useState("");
    return (
        <div className="newPersonalChatContainer">
            <Toaster position="top-right" />
            <TextField
                label="username"
                className="UsernameField"
                onChange={(e) => { setUsername(e.target.value) }}
            />
            <button className="AddChatButton" onClick={async () => {
                const answer: creatingChatAnswer | undefined = await CreatePrivateChat(username);
                console.log(answer);
                if (answer?.success) {
                    toast.success("success");
                }
                else {
                    toast.error(`${answer?.error}`);
                }


            }}>add</button>
        </div >
    )
}