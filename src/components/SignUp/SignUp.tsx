import { useState } from "react"
import "./SignUpStyle.css"
import { signupCheck } from "./SignUpLogic";
import toast, { Toaster } from "react-hot-toast";

interface SignUpContainerProps{
    startSession:()=>void;
}

function SignUp({startSession}:SignUpContainerProps) {

    const [FormUsername, setFormUsername] = useState<string>("");
    const [FormPassword, setFormPassword] = useState<string>("");
    const [confirmPassword, setconfirmPassword] = useState<string>("");

    const [errorUsernameClass, setErrorUsernameClass] = useState<string>("");
    const [errorPasswordClass, setErrorPasswordClass] = useState<string>("");

    async function sign(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const signUpTry = await signupCheck(FormUsername, FormPassword, confirmPassword);
        console.log(signUpTry);
        switch (signUpTry) {
            case "UsernameExist":
                setErrorUsernameClass("ExistNameErrorClass");
                setErrorPasswordClass("");
                toast.error("user with this username exist");
                break;
            case "NotComfiredPassword":
                setErrorUsernameClass("");
                setErrorPasswordClass("NotConfirmedPasswordClass")
                toast.error("password must be same in to fields");
                break;
            case "registrated":
                startSession();
                break;
            default:
                break;
        }


    }



    return (
        <form className="SignUpContainer" onSubmit={sign}>
            <Toaster position="top-right" />
            <label htmlFor="username">username:</label>
            <input
                type="text"
                id="username"
                className={errorUsernameClass}
                onChange={(e) => setFormUsername(e.target.value)}
                required
            />

            <label htmlFor="password">password:</label>
            <input
                type="password"
                id="password"
                className={errorPasswordClass}
                onChange={(e) => setFormPassword(e.target.value)}
                required
            />

            <label htmlFor="ConfirmPassword">confirm password:</label>
            <input
                type="password"
                id="ConfirmPassword"
                className={errorPasswordClass}
                onChange={(e) => {
                    setconfirmPassword(e.target.value);
                }}
                required
            />



            <button type="submit">Sign Up</button>
        </form>
    )
}
export default SignUp