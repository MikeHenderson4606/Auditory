
import { useSelector } from 'react-redux';
import { AuditoryState } from '../../../store';

function Details() {
    const { userData } = useSelector((state:AuditoryState) => state.userDataReducer);

    return (
        <div>
            <div className="border border-success rounded p-2" style={{backgroundColor: "#f8f9fa"}}>
                <span>Auditory Details</span>
                <h3>Username: {userData.auditory.username}</h3>
                <button className="btn btn-success">
                    Change Username
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