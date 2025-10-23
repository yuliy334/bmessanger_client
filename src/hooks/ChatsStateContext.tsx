import React, { createContext, useReducer, useContext } from "react";
import type { chat, Info, message } from "../types/chatsInfoTypes";


export type Action =
    | { type: "set_chats"; payload: Info }
    | { type: "add_chat"; payload: chat }
    | {type: "set_message"; payload:message}

const initialChatsState: Info = { username:"", chats: [] }

function chatsReducer(state: Info, action: Action): Info {
    switch (action.type) {
        case "set_chats":
            return { ...action.payload };
        case "add_chat":
            return { ...state, chats: [...state.chats, action.payload] };
        case "set_message":
            return { ...state, chats: state.chats.map((chat)=>{
                console.log(chat.id," ", action.payload.chatId);
                if(chat.id == Number(action.payload.chatId)){
                    console.log("works");
                    return {...chat, messages: [...chat.messages, action.payload]}
                }
                else{
                    console.log("dontWorks");
                    return chat;
                }
            })}
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