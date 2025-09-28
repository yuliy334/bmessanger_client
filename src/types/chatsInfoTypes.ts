export interface user {
    username: string;
}
export interface message {
    senderName: string;
    text: string;
}
export interface chat {
    chatName: string;
    id: number;
    messages: message[];
    type: string;
    users: user[];

}
export interface chats {
    chats: chat[];
}