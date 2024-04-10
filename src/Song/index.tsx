import { useState } from "react";
import zbcover from '../media/ZBCover.png';

import './index.css';

function Song(props:any) {
    const [play, setPlay] = useState(false);

    const title = props.title;
    const artist = props.artist;
    const poster = props.poster;
    const linkTo = props.link;
    const description = props.description;

    function handlePlayPause() {
        setPlay(!play);
    }

    return (
        <div className="border border-secondary rounded row bg-success-subtle">
            <div className="col-9">
                <h4 className="text-center mt-2">{title}</h4>
                <h5 className="text-center">{artist}</h5>
                <h5 className="text-center">{poster}</h5>
                <h6 className="text-center">{description}</h6>
                <nav className="navbar">
                    <div className="container-fluid justify-content-center">
                        {play ? 
                        <button className="btn btn-outline-success no-border" style={{border: "none"}} onClick={() => handlePlayPause()}>
                            <i className="fa fa-pause-circle fa-2x"></i>
                        </button> :
                        <button className="btn btn-outline-success no-border" style={{border: "none"}} onClick={() => handlePlayPause()}>
                            <i className="fa fa-play-circle fa-2x"></i>
                        </button>}
                        <a href={linkTo} target="_blank" className="btn btn-outline-success fs-4 ms-2" style={{border: "none"}} >
                            <i className="fa fa-share"></i>
                        </a>
                        <a href={linkTo} target="_blank" className="btn btn-outline-success fs-4 ms-2" style={{border: "none"}} >
                            <i className="fa fa-heart-o"></i>
                        </a>
                    </div>
                </nav>
            </div>
            <div className="col-3 p-0">
                <img src={zbcover} width="80%" height="80%" className="img-thumbnail float-end border rounded" />
            </div>
        </div>
    );
}

export default Song;