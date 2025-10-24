import React, { createContext, useReducer} from "react";
import type { chat, Info, message } from "../types/chatsInfoTypes";
import type { AddedUserAnswer } from "../types/WebSocketTypes";


export type Action =
    | { type: "set_chats"; payload: Info }
    | { type: "add_chat"; payload: chat }
    | { type: "set_message"; payload: message }
    | { type: "add_user"; payload: AddedUserAnswer }
    | { type: "delete_chat"; payload: number }
    | { type: "delete_user"; payload: AddedUserAnswer }

const initialChatsState: Info = { username: "", chats: [] }

function chatsReducer(state: Info, action: Action): Info {
    switch (action.type) {
        case "set_chats":
            return { ...action.payload };
        case "add_chat":
            const ChatExists = state.chats.some((chat) => chat.id == action.payload.id);
            if (ChatExists) {
                return state
            }
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

        case "add_user":
            const UserExists = state.chats.at(action.payload.chatId)?.users.some((user) => user.username == action.payload.username);
            if (UserExists) {
                return state;
            }

            const chatWithNewUserId = state.chats.findIndex((chat) => (chat.id == action.payload.chatId));
            const NewState = { ...state };
            NewState.chats.at(chatWithNewUserId)?.users.push({ username: action.payload.username });
            return { ...NewState };

        case "delete_chat":
            const chatExists = state.chats.some(chat => chat.id == action.payload);
            if (!chatExists) {
                return state;
            }
            const NewDeletedState = {
                ...state,
                chats: state.chats.filter(chat => chat?.id !== action.payload)
            };
            console.log(NewDeletedState);
            return {...NewDeletedState};
        case "delete_user":
            const NewChatWithoutUser = {
                ...state,
                chats: state.chats.map(chat => {
                    if (chat.id === action.payload.chatId) {
                        return {
                            ...chat,
                            users: chat.users.filter(user => user.username !== action.payload.username)
                        };
                    }
                    return chat;
                })
            };
            console.log(NewChatWithoutUser);
            return NewChatWithoutUser;

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