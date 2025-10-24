import {useEffect, useState } from "react";
import type { AuthUser } from "../../types/user";
import { logInCheck } from "./LogInLogic";
import "./LogInStyle.css"
import toast, { Toaster } from "react-hot-toast";


interface LogInUpContainerProps{
    startSession:()=>void;
}

function LogIn({startSession}:LogInUpContainerProps) {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    async function login(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const newUser:AuthUser = {username,password};
        const logInAnswer = await logInCheck(newUser);
        if(logInAnswer.login){
            startSession();
        }
        else{
            toast.error("wrong username or password");
        }

    }


    return (
        <form className="LogInContainer" onSubmit={login}>
            <Toaster position="top-right" />
            <label htmlFor="username">username:</label>
            <input
                type="text"
                id="username"
                onChange={(e)=>setUsername(e.target.value)}
                required
            />

            <label htmlFor="password">password:</label>
            <input
                type="password"
                id="password"
                onChange={(e)=>setPassword(e.target.value)}
                required
            />



            <button type="submit">Log In</button>
        </form>
    )
}

export default LogIn;