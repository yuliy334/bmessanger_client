import { TextField, Button } from "@mui/material";
import "./NewChatStyle.css"
import { CreatePrivateChat } from "../../services/WebSocketFunctions";
import { useState } from "react";
export function NewChat() {
    const [username, setUsername] = useState("");
    return (
        <div className="newPersonalChatContainer">
            <TextField
                id="outlined-basic"
                label="username"
                variant="outlined"
                onChange={(e) => { setUsername(e.target.value) }}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: "black",
                            borderWidth: "3px",
                        },
                        "&:hover fieldset": {
                            borderColor: "black",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "black",
                        },
                    },
                    "& .MuiInputLabel-root": {
                        color: "black",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                        color: "black",
                    },
                    input: {
                        color: "black",
                    },
                }}
            />
            <Button onClick={async () => {
                const answer = await CreatePrivateChat(username);
                console.log(answer);
            }} variant="contained">add</Button>
        </div >
    )
}