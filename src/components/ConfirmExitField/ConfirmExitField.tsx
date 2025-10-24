
import "./ConfirmExitFieltStyle.css"
import { DeleteUserFromChat } from "../../services/WebSocketFunctions";
import type { openChatInfo } from "../../types/openChatInfoTypes";


interface ConfirmExitFieldProps {
    chatId: number;
    setIsExitConfirm: React.Dispatch<boolean>;
    setOpenChatInfo: React.Dispatch<openChatInfo>;
}

export function ConfirmExitField({ setIsExitConfirm, chatId, setOpenChatInfo }: ConfirmExitFieldProps) {

    async function NotConfirmHandle() {
        setIsExitConfirm(false);
    }
    async function ConfirmHandle() {

        DeleteUserFromChat(chatId);
        setIsExitConfirm(false);
        setOpenChatInfo({ isOpen: false, id: -1 });
    }
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