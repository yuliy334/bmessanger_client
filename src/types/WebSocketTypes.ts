export interface CreatePrivateChatAnswerDto {
    status: string;
}
export interface NewChatResult {
    chat: any;
}
export interface creatingChatAnswer {
    success: boolean;
    error?: string;
    chatId?: number | undefined;
}
export interface addPersonalChatAnswer {
    newChatResult: NewChatResult[];
    creatingChatAnswer: creatingChatAnswer;
}
export interface addUserToGroupChat {
    IsExist: boolean;
    error?: string;
}
export interface CreateGroupChat {
    users: string[];
    title: string;
}
export interface GroupChatAnswer {
    creatingChatAnswer: creatingChatAnswer;
}
export interface AddedUserAnswer{
    username:string;
    chatId:number;
}