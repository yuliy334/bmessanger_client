import type { openChatInfo } from "../../types/openChatInfoTypes";
import { Chat } from "../Chat/Chat";
import { NewGroupChat } from "../NewGroupChat/NewGroupChat";
import { NewPersonalChat } from "../NewPersonalChat/NewPersonalChat";
import "./ChatContainerStyle.css"
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import type { user } from "../../types/chatsInfoTypes";
import { AddUserToChat } from "../AddUserToChat/AddUserToChat";
import React, { useState } from "react";
import { ConfirmExitField } from "../ConfirmExitField/ConfirmExitField";

interface MessagesProps {
    chatName: string;
    IsNewPersonalChat: boolean;
    IsNewGroupChat: boolean;
    OpenChatInfo: openChatInfo;
    setOpenChatInfo: React.Dispatch<openChatInfo>;
    chatUsers: user[];
}

export function ChatContainer({ chatName, IsNewPersonalChat, OpenChatInfo, IsNewGroupChat, chatUsers, setOpenChatInfo }: MessagesProps) {
    const title = IsNewPersonalChat ? "create new personal chat" : IsNewGroupChat ? "create new group chat" : chatName;
    const [IsAddUserOpen, setIsAddUserOpen] = useState<boolean>(false);
    const [IsExitConfirm, setIsExitConfirm] = useState<boolean>(false);

    return (
        <div className="messagesContainer">
            {IsAddUserOpen && <AddUserToChat chatUsers={chatUsers} chatId={OpenChatInfo.id} setIsAddUserOpen={setIsAddUserOpen} />}
            {IsExitConfirm && <ConfirmExitField setIsExitConfirm={setIsExitConfirm} chatId={OpenChatInfo.id} setOpenChatInfo={setOpenChatInfo}/>}
            <div className="ChatInfo">
                <div className="ChatInfoHead">
                    <span className="ChatName"> {title}</span>

                    {OpenChatInfo.type == "group" && <PersonAddAlt1Icon className="addPersonToChat" onClick={() => setIsAddUserOpen(true)} />}
                    {OpenChatInfo.type == "group" && <ExitToAppIcon className="ExitFromChat" onClick={() => setIsExitConfirm(true)}/>}
                </div>

                {OpenChatInfo.type == "group" && <div className="UserNamesInChat">{chatUsers.map((user, id) => {
                    if (id == 0) {
                        return user.username
                    }
                    else {
                        return " ," + user.username
                    }

                })}</div>}


            </div>
            <div className="ChatBody">
                {IsNewPersonalChat && <NewPersonalChat />}
                {IsNewGroupChat && <NewGroupChat />}
                {OpenChatInfo.isOpen && <Chat ChatId={OpenChatInfo.id} />}
            </div>

        </div>
    )
}