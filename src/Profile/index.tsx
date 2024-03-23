
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AuditoryState } from "../store";

function Profile() {
    const { isLoggedIn } = useSelector((state:AuditoryState) => state.loginReducer);
    const { userData } = useSelector((state:AuditoryState) => state.userDataReducer);

    if (isLoggedIn) {
        return (
            <div className="container-fluid" style={{marginTop: "100px"}}>
                {userData.username}
            </div>
        )
    } else {
        return (
            <div style={{marginTop: "100px"}}>
                You are not logged in, please log in here: 
                <Link to="/login">Login</Link>
            </div>
        )
    }
}

export default Profile;