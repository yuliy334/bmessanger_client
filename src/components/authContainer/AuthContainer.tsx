import { useState } from "react";
import SignUp from "../SignUp/SignUp";
import "./AuthContainerStyle.css"
import LogIn from "../Login/LogIn";

interface AuthContainerProps{
    startSession:()=>void;
}

function AuthContainer({startSession}:AuthContainerProps) {
    const [isSignUp, setIsSignUp] = useState<boolean>(true);




    return (
        <div className="authContainer">
            <div className="menu_bar">
                <div id="left" onClick={() => setIsSignUp(false)}>log in</div>
                <div id="right" onClick={() => setIsSignUp(true)}>sign up</div>
            </div>
            {isSignUp?<SignUp startSession={startSession}/>:<LogIn startSession={startSession}/>}
            
        </div>
    )
}
export default AuthContainer;