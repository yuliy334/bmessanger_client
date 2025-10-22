import type { message } from "../types/chatsInfoTypes";
import type { messageSend } from "../types/messageSendType";
import type { addPersonalChatAnswer, CreatePrivateChatAnswerDto } from "../types/WebSocketTypes";
import { getSocket } from "./WebSocketInicialization";

export async function deleteSession(): Promise<boolean> {
    const socket = getSocket();
    if (!socket) {
        console.log("no session");
        return false;
    }
    else {
        socket.emit("deleteSession");
        return true;
    }
}
export async function CreatePrivateChat(username: string) {
    const socket = getSocket();
    if (!socket) {
        console.log("no session");
        return undefined;
    }
    else {
        return new Promise((resolve) => {
            socket.emit(
                "addPersonalChat",
                { username },
                (response: addPersonalChatAnswer) => {
                    resolve(response);
                }
            );
        });
    }
}
export async function SendMesssage(data: messageSend) {
    const socket = getSocket();
    if (!socket) {
        console.log("no session");
        return false;
    }
    return new Promise((resolve) => {
        console.log("111");
        socket.emit("sendMessage", data, (response:message) => {
            console.log("222");
            resolve(response);
        });
    })

}