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
        <div className="my-4 border border-secondary rounded row bg-body-tertiary">
            <div className="col-9">
                <h4 className="text-center mt-2">{title}</h4>
                <h5 className="text-center">{artist}</h5>
                <nav className="navbar">
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
            <div className="col-3">
                <img src='./../../../../public/logo192.png' width="75%" height="75%" />
            </div>
        </div>
    );
}

export default Song;