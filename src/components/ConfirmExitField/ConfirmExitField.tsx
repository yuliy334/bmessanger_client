import { useContext, useEffect, useState } from "react";
import "./ConfirmExitFieltStyle.css"
import { ChatsContext } from "../../hooks/ChatsStateContext";
import { DeleteUserFromChat } from "../../services/WebSocketFunctions";


interface ConfirmExitFieldProps {
    chatId: number;
    setIsExitConfirm: React.Dispatch<boolean>;
}

export function ConfirmExitField({ setIsExitConfirm, chatId }: ConfirmExitFieldProps) {

    async function NotConfirmHandle() {
        setIsExitConfirm(false);
    }
    async function ConfirmHandle() {

        DeleteUserFromChat(chatId);
        setIsExitConfirm(false);
    }
    useEffect(() => {
        console.log("sdfsdfsdf",chatId);
    }, [])
    return (
        <div className="ExitBackground">
            <div className="ExitConfirmContainer">
                <p>Exit from the group</p>
                <div className="ExitComfirmButtons">
                    <button className="YesButton" onClick={ConfirmHandle}>yes</button>
                    <button className="NoButton" onClick={NotConfirmHandle}>no</button>
                </div>
            </div>
        </div>
    )
}