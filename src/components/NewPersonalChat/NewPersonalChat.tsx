import { TextField, Button } from "@mui/material";
import "./NewPersonalChatStyle.css"
import { CreatePrivateChat } from "../../services/WebSocketFunctions";
import { useState } from "react";
export function NewPersonalChat() {
    const [username, setUsername] = useState("");
    return (
        <div className="newPersonalChatContainer">
            <TextField
                label="username"
                className="UsernameField"
                onChange={(e) => { setUsername(e.target.value) }}
            />
            <Button onClick={async () => {
                const answer = await CreatePrivateChat(username);
                console.log(answer);
            }} variant="contained">add</Button>
        </div >
    )
}