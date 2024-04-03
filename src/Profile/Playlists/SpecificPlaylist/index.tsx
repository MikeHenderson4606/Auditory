import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import * as client from "../../../Client";


function SpecificPlaylist() {
    const { playlistId, playlistName } = useParams();
    const [loading, setLoading] = useState(true);
    const [tracks, setTracks] = useState([]);
    const [filteredTracks, setFilteredTracks] = useState([]);
    const navigate = useNavigate();

    const editSearch = (input:any) => {
        if (input === "") {
            setFilteredTracks(tracks);
        } else {
            const appliedSearch = tracks.filter((item:any) => {
                const splitInput = input.split(' ');
                // TODO: Implement a better search
                // splitInput.map((word:string) => {
                //     item.track.name.toLowerCase().includes(word.toLowerCase()) || item.track.artists[0].name.toLowerCase().includes(word.toLowerCase());
                // });
                return item.track.name.toLowerCase().includes(input.toLowerCase()) || item.track.artists[0].name.toLowerCase().includes(input.toLowerCase());
            });
            setFilteredTracks(appliedSearch);
        }
    }

    useEffect(() => {
        const getTracksFromPlaylist = async () => {
            if (tracks.length === 0) {
                const response = await client.getSpotifyTracks(playlistId);
                setTracks(response.items);
                setFilteredTracks(response.items);
                setLoading(false);
            } else {
                setLoading(false);
            }
        }
        getTracksFromPlaylist();
    })

    return (
        <div>
            <h1 className="text-center">{playlistName}</h1>
            <button className="btn btn-outline-success no-border mb-1" style={{border: "none"}} onClick={(e) => {
                navigate('/profile/playlists');
            }}>
                <i className="fa fa-arrow-left fa-1x"> Back</i>
            </button>
            {!loading ?
            <div>
                <input type="text" placeholder="Search through playlist" className="form-control mb-1" onChange={(e) =>{
                    editSearch(e.target.value);
                }} />
                <ul className="list-group">
                    {filteredTracks.map((track:any, index) => {
                        return (
                            <li className="list-group-item text-center" key={index}>
                                <h5>
                                    {track.track.name} 
                                </h5>
                                <h6>
                                    {track.track.artists[0].name}
                                </h6>
                                <button className="btn btn-outline-success no-border position-relative justify-center" style={{border: "none"}}>
                                    <i className="fa fa-play-circle fa-2x"></i>
                                </button>
                                <button className="btn btn-outline-success no-border position-relative justify-center fs-4 ms-1" style={{border: "none"}}>
                                    <i className="fa fa-share"></i>
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </div> :
            <div>
                Your tracks are loading... hold tight.
            </div>
            }
            
        </div>
    )
}

export default SpecificPlaylist;