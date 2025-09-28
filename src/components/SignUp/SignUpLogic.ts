import type { AuthUser } from "../../types/user";
import { SignUpRequest } from "../../utils/httpRequests";

export async function signupCheck(FormUsername: string, FormPassword: string, confirmPassword: string) {
    if (FormUsername && FormPassword) {
        if (confirmPassword == FormPassword) {
            const newUser: AuthUser = {
                username: FormUsername,
                password: FormPassword
            }
            const regInfo = await SignUpRequest(newUser);
            console.log(regInfo);
            return regInfo.status;
        }
        else{
            return "NotComfiredPassword"
        }
    }
}