import type { AuthUser } from "../../types/user";
import { LogInRequest } from "../../utils/httpRequests";

export async function logInCheck(newUser:AuthUser){
    if(newUser){
        try{
            const LogInAnswer = await LogInRequest(newUser);
            return LogInAnswer;
        }
        catch{
            throw console.error("server error");
            
        }
    }
    else{
        throw Error("missing elements");
    }
}