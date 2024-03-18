import { useState } from "react";

import './index.css';

function Song(props:any) {
    const [play, setPlay] = useState(false);

    const title = props.title;
    const artist = props.artist;

    function handlePlayPause() {
        setPlay(!play);
    }

    return (
        <div className="my-4 border border-secondary rounded">
            <h4 className="text-center">{title}</h4>
            <h5 className="text-center">{artist}</h5>
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid justify-content-center">
                    {play ? 
                    <button className="btn btn-outline-success no-border" onClick={() => handlePlayPause()}>
                        <i className="fa fa-pause-circle fa-2x"></i>
                    </button> :
                    <button className="btn btn-outline-success no-border" onClick={() => handlePlayPause()}>
                        <i className="fa fa-play-circle fa-2x"></i>
                    </button>}
                </div>
            </nav>
        </div>
    );
}

export default Song;