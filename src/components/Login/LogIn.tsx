import {useState } from "react";
import type { AuthUser } from "../../types/user";
import { logInCheck } from "./LogInLogic";
import "./LogInStyle.css"


interface LogInUpContainerProps{
    startSession:()=>void;
}

function LogIn({startSession}:LogInUpContainerProps) {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorAuth, setErrorAuth] = useState<boolean>(false);

    async function login(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const newUser:AuthUser = {username,password};
        const logInAnswer = await logInCheck(newUser);
        if(logInAnswer.login){
            console.log("works");
            startSession();
            console.log("work2");
        }
        else{
            setErrorAuth(true);
        }

    }



    return (
        <form className="LogInContainer" onSubmit={login}>
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
            {errorAuth && <h1>wrong username or password</h1>}
        </form>
    )
}

export default LogIn;