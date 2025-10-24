import type { Action } from "../hooks/ChatsStateContext";
import type { Info, message } from "../types/chatsInfoTypes";
import type { messageSend } from "../types/messageSendType";
import type {addUserToGroupChat, CreateGroupChat, creatingChatAnswer, GroupChatAnswer } from "../types/WebSocketTypes";
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
        return new Promise<creatingChatAnswer>((resolve) => {
            
            socket.emit(
                "addPersonalChat",
                { username },
                (response: creatingChatAnswer) => {
                    console.log(response);
                    resolve(response);
                }
            );
        });
    }
}
export async function CreatePublicChat(data: CreateGroupChat) {

    const socket = getSocket();
    if (!socket) {
        console.log("no session");
        return undefined;
    }
    else {

        return new Promise((resolve) => {
            console.log("sdfsdfsdf hello");
            socket.emit(
                "addGroupChat",
                data,
                (response: GroupChatAnswer) => {
                    console.log(response);
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
        throw new Error("NoSocketExist");
    }
    return new Promise<message>((resolve) => {
        socket.emit("sendMessage", data, (response: message) => {
            console.log(response);
            resolve(response);
        });
    })

}

export async function getAllChats(dispatch: React.Dispatch<Action>) {
    const socket = getSocket();
    if (socket) {
        socket.emit("getAllChats", (response: Info) => {
            dispatch({
                type: "set_chats", payload: {
                    username: response.username,
                    chats: response.chats,
                }
            });
            console.log(response.chats);
        })
    }
}
export async function IsUserExist(username: string) {
    const socket = getSocket();
    if (socket) {
        return new Promise<addUserToGroupChat>((resolve) => {
            socket.emit("IsUserExist", { username: username }, (response: addUserToGroupChat) => {
                console.log("object: ", response);
                resolve(response);
            })
        })

    }
}
export async function AddUserToChatFunc(chatId: number, username: string) {
    const socket = getSocket();
    if (socket) {
        socket.emit("addUserToChat", { username: username, chatId:chatId })
    }
}
export async function DeleteUserFromChat(chatId:number) {
    console.log("object", chatId);
    const socket = getSocket();
    if (socket) {
        socket.emit("deleteUserFromChat", {chatId})
    }
}

