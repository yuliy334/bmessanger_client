export interface user {
    username: string;
}
export interface message {
    senderName: string;
    text: string;
    chatId: number;
    createdAt: Date
}
export interface chat {
    chatName: string;
    id: number;
    messages: message[];
    type: string;
    users: user[];

}

export interface Info {
    username: string,
    chats: chat[]
}