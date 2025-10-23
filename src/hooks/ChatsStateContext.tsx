import React, { createContext, useReducer, useContext } from "react";
import type { chat, Info, message } from "../types/chatsInfoTypes";
import { Chats } from "../components/ChatsMenu/ChatsMenu";


export type Action =
    | { type: "set_chats"; payload: Info }
    | { type: "add_chat"; payload: chat }
    | { type: "set_message"; payload: message }

const initialChatsState: Info = { username: "", chats: [] }

function chatsReducer(state: Info, action: Action): Info {
    switch (action.type) {
        case "set_chats":
            return { ...action.payload };
        case "add_chat":
            return { ...state, chats: [action.payload, ...state.chats] };
        case "set_message":
            const chatWithNewMessageId = state.chats.findIndex((chat) => chat.id == Number(action.payload.chatId));
            let chatWithNewMessage = state.chats.at(chatWithNewMessageId);
            if (!chatWithNewMessage) {
                return state;
            }
            chatWithNewMessage = { ...chatWithNewMessage, messages: [...chatWithNewMessage.messages, action.payload] }

            const chatsWithoutChatWithNewMessage = state.chats.filter((_, index) => index != chatWithNewMessageId);
            return { ...state, chats: [chatWithNewMessage, ...chatsWithoutChatWithNewMessage] }
        default:
            return state;
    }
}

export const ChatsContext = createContext<{
    state: Info;
    dispatch: React.Dispatch<Action>;
} | null>(null);

export function ChatsProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(chatsReducer, initialChatsState);

    return (
        <ChatsContext.Provider value={{ state, dispatch }}>
            {children}
        </ChatsContext.Provider>
    );
}