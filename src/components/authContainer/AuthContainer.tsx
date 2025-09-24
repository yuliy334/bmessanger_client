import SignUp from "../SignUp/SignUp";
import "./AuthContainerStyle.css"

function AuthContainer() {
    return (
        <div className="authContainer">
            <div className="menu_bar">
                <div id="left">log in</div>
                <div id="right">sign up</div>
            </div>
            <SignUp/>
        </div>
    )
}
export default AuthContainer;