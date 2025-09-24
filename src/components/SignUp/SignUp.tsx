import { useState } from "react"
import "./SignUpStyle.css"
import type { AuthUser } from "../../types/user";

function SignUp() {

    const [FormUsername, setFormUsername] = useState<string>();
    const [FormPassword, setFormPassword] = useState<string>();
    const [confirmPassword, setconfirmPassword] = useState<string>();

    async function sign() {
        if (FormUsername && FormPassword) {
            if (confirmPassword == FormPassword) {
                const newUser: AuthUser = {
                    username: FormUsername,
                    password: FormPassword
                }
                const reg = await fetch("http://localhost:3000/auth/reg", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newUser),
                    credentials: "include",
                });
                const regInfo = await reg.json();
                console.log(regInfo);
            }
        }

    }



    return (
        <form className="SignUpContainer">
            <label htmlFor="username">username:</label>
            <input
                type="text"
                id="username"
                onChange={(e) => setFormUsername(e.target.value)}
                required
            />

            <label htmlFor="password">password:</label>
            <input
                type="password"
                id="password"
                onChange={(e) => setFormPassword(e.target.value)}
                required
            />

            <label htmlFor="ConfirmPassword">confirm password:</label>
            <input
                type="password"
                id="ConfirmPassword"
                onChange={(e) => {
                    setconfirmPassword(e.target.value);
                }}
                required
            />



            <button type="submit" onClick={sign}>Sign Up</button>
        </form>
    )
}
export default SignUp