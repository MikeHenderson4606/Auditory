
import { useSelector } from "react-redux";
import { AuditoryState } from "../../store";

function Account() {
    const { userData } = useSelector((state:AuditoryState) => state.userDataReducer);
    return (
        <div>
            <h1>Account</h1> <hr />
            <h4>Username: {userData.username}</h4> 
            <h4>Password: ****</h4>
            <hr />
        </div>
    );
}

export default Account;