import React, { createContext, useReducer, useContext } from "react";
import type { chat, chats } from "../types/chatsInfoTypes";


type Action =
    | { type: "set_chats"; payload: chat[] }
    | { type: "add_chat"; payload: chat }

const initialChatsState: chats = { chats: [] }

// Редюсер
function chatsReducer(state: chats, action: Action): chats {
    switch (action.type) {
        case "set_chats":
            return { chats: action.payload };
        case "add_chat":
            return { chats: [...state.chats, action.payload] };
        default:
            return state;
    }
}

// Создаем контекст
export const ChatsContext = createContext<{
    state: chats;
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