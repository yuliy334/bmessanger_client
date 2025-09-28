import type { AuthUser } from "../types/user";

export async function checkSessionRequest() {
    const checkresponse = await fetch("http://localhost:3000/auth/check", { credentials: "include" });
    const data = await checkresponse.json();
    return data;
}

export async function SignUpRequest(newUser: AuthUser) {
    const regAnswer = await fetch("http://localhost:3000/auth/reg", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
        credentials: "include",
    });
    const regInfo = await regAnswer.json();
    return regInfo;
}

export async function LogInRequest(newUser: AuthUser) {
    const logInAnswer = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(newUser),
        credentials:"include",
    });
    const logInAnswerJson = logInAnswer.json();
    return logInAnswerJson;
}
