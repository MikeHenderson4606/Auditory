
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AuditoryState } from '../../../store';
import * as client from "../../../Client";

function Details() {
    const { userData } = useSelector((state:AuditoryState) => state.userDataReducer);
    const [profile, setProfile] = useState<any>({});
    const [updateNumber, setUpdateNumber] = useState(false);
    const [updateEmail, setupdateEmail] = useState(false);
    const [updateUsername, setupdateUsername] = useState(false);
    const [newUsername, setNewUsername] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newNumber, setNewNumber] = useState(0);

    const updateUser = async () => {
        const user = await client.getUser(userData.auditory.userId);
        console.log(user.user._id, newUsername, newEmail, newNumber)
        await client.updateUser(user.user._id, newUsername, newEmail, newNumber);
        alert("Refresh the browswer for updates to your profile");
    }

    const revert = async (item:string) => {
        const response = await client.getProfile();
        if (response !== 400) {
            if (item === "username") {
                setNewUsername(response.username);
            }
            if (item === "email") {
                setNewEmail(response.email);
            }
            if (item === "number") {
                setNewNumber(response.number);
            }
        }
    }

    useEffect(() => {
        const getProfile = async () => {
            const response = await client.getProfile();
            if (response !== 400) {
                setNewUsername(response.username);
                setNewEmail(response.email);
                setNewNumber(response.number);
                const formattedNumber = response.number.substring(0, 3) + "-" + 
                                        response.number.substring(3, 6) + "-" +
                                        response.number.substring(6);
                setProfile({...response, number: formattedNumber});
            }
        }
        getProfile();
    }, []);

    return (
        <div>
            <div className="border border-success rounded p-2" style={{backgroundColor: "#f8f9fa"}}>
                <span>Auditory Details</span>
                <h3>Username: {userData.auditory.username}</h3>
                {updateUsername ? 
                    <div>
                        <input className="form-control mb-1" placeholder="New username" type="text" onChange={(e:any) => setNewUsername(e.target.value)}/>
                        <button className="btn btn-outline-success mb-2" onClick={(e:any) => {
                            setupdateUsername(false);
                            updateUser();
                        }}>
                            Confirm
                        </button> 
                        <button className="btn btn-outline-danger ms-2 mb-2" onClick={(e:any) => {
                            setupdateUsername(false);
                            revert("username");
                        }}>
                            Cancel
                        </button>
                    </div> :
                    <div> </div>
                }
                <button className="btn btn-success mb-2" onClick={(e:any) => {
                    setupdateUsername(true);
                }}>
                    Change Username
                </button>
                <h3>Email: {profile.email}</h3>
                {updateEmail ? 
                    <div>
                        <input className="form-control mb-1" placeholder="New Email" type="text" onChange={(e:any) => setNewEmail(e.target.value)} />
                        <button className="btn btn-outline-success mb-2" onClick={(e:any) => {
                            setupdateEmail(false);
                            updateUser();
                        }}>
                            Confirm
                        </button> 
                        <button className="btn btn-outline-danger ms-2 mb-2" onClick={(e:any) => {
                            setupdateEmail(false);
                            revert("email");
                        }}>
                            Cancel
                        </button>
                    </div> :
                    <div> </div>
                }
                <button className="btn btn-success mb-2" onClick={(e:any) => {
                    setupdateEmail(true);
                }}>
                    Change Email
                </button>
                <h3>Phone Number: {profile.number}</h3>
                {updateNumber ? 
                    <div>
                        <input className="form-control mb-1" placeholder="New number" type="number" onChange={(e:any) => setNewNumber(parseInt(e.target.value))} />
                        <button className="btn btn-outline-success mb-2" onClick={(e:any) => {
                            setUpdateNumber(false);
                            updateUser();
                        }}>
                            Confirm
                        </button> 
                        <button className="btn btn-outline-danger ms-2 mb-2" onClick={(e:any) => {
                            setUpdateNumber(false);
                            revert("number");
                        }}>
                            Cancel
                        </button>
                    </div> :
                    <div> </div>
                }
                <button className="btn btn-success" onClick={(e:any) => {
                    setUpdateNumber(true);
                }}>
                    Change Number
                </button>
            </div>
            <div className="border border-success rounded p-2 mt-3" style={{backgroundColor: "#f8f9fa"}}>
                <span>Spotify Details</span>
                <h3>Username: {userData.spotify.user.username}</h3>
            </div>
           
            
        </div>
        
    )
}

export default Details;