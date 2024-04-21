
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AuditoryState } from '../../../store';
import * as client from "../../../Client";

function Details() {
    const { userData } = useSelector((state:AuditoryState) => state.userDataReducer);
    const [profile, setProfile] = useState<any>({});

    useEffect(() => {
        const getProfile = async () => {
            const response = await client.getProfile();
            if (response !== 400) {
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
                <button className="btn btn-success">
                    Change Username
                </button>
                <h3>Email: {profile.email}</h3>
                <button className="btn btn-success">
                    Change Email
                </button>
                <h3>Phone Number: {profile.number}</h3>
                <button className="btn btn-success">
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