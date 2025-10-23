import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { CreatePublicChat, IsUserExist } from "../../services/WebSocketFunctions";
import { UserAddedToGroup } from "../UserAdedToGroup/UserAdedToGroup";
import "./NewGroupChatStyle.css";
import toast, { Toaster } from "react-hot-toast";

export function NewGroupChat() {
    const [groupName, setGroupName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [usernameList, setUsernameList] = useState<string[]>([]);

    return (
        <div className="NewGroupContainer">
            <Toaster position="top-right" />
            <div className="GroupNameContainer">
                <TextField
                    label="Enter group name"
                    className="GroupNameAddField"
                    onChange={(e) => {

                        setGroupName(e.target.value);
                    }}
                />
            </div>
            <div className="AddNewUserToGroupContainer">
                <TextField
                    label="username"
                    className="UserAddField"
                    value={username}
                    onChange={(e) => {

                        setUsername(e.target.value);
                    }}
                />
                <button className="UserAddButton" onClick={async () => {
                    if (usernameList.includes(username)) {
                        toast.error(`${username} exist in the list`);
                        return
                    }
                    const isExist = await IsUserExist(username)
                    if (isExist?.IsExist) {
                        setUsernameList([...usernameList, username]);
                        setUsername("");
                        toast.success(`${username} was added`);
                    }
                    else {
                        console.log(isExist?.error);
                        if (isExist?.error) {
                            toast.error(isExist!.error);
                        }
                    }
                }}>ADD</button>
            </div>

            <div className="usersContainer">{usernameList.map((username, id) => (
                <UserAddedToGroup key={username + id} username={username} usernameList={usernameList} setUsernameList={setUsernameList} />
            ))}</div>

            <button className="CreateGroup" onClick={async () => {
                await CreatePublicChat({users:usernameList, title:groupName})

            }}>
                Create Group
            </button>

        </div>
    )
}