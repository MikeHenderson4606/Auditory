import { useEffect, useState } from "react";
import * as client from '../Client';
import Song from "../Song";
import { Link } from "react-router-dom";
import AuditoryModal from "../AuditoryModal";

function Search() {
    const [selectedOption, setSelectedOption] = useState<string>("");
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any>([]);
    const [searchOptions, setSearchOptions] = useState<string[]>([]);
    const [currentlyPlayingTrack, setCurrentlyPlayingTrack] = useState("");
    const [modalText, setModalText] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [limit, setLimit] = useState<number>(20);

    const handleModalShow = () => {
        setShowModal(!showModal);
    }

    const playSong = (trackId:string) => {
        console.log(trackId);
        setCurrentlyPlayingTrack(trackId);
        client.playSong(trackId).then(response => {
            if (response === 400) {
                setModalText("There was an error playing the track. Please ensure Spotify is open, you are not listening along to anyone, and try again.");
                setShowModal(!showModal);
                setCurrentlyPlayingTrack("");
            }
        })
    }

    const pauseSong = () => {
        setCurrentlyPlayingTrack("");
        client.pauseSong().then(response => {
            if (response === 400) {
                setModalText("There was an error playing the track. Please ensure Spotify is open, you are not listening along to anyone, and try again.");
                setShowModal(!showModal);
                setCurrentlyPlayingTrack("");
            }
        })
    }

    const DisplayResults = () => {
        if (selectedOption === "post") {
            return (
                <div>
                    <h3 className="text-center">Results</h3>
                    <div className="list-group">
                        {results.map((result:any, index:number) => {
                            return (
                                <div className="list-group-item" key={index}>
                                    <Song id={result.id} title={result.title} artist={result.artist} poster={result.poster} posterId={result.posterId} linkTo={result.linkTo} description={result.description} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        } else if (selectedOption === "user") {
            return (
                <div>
                    <h3 className="text-center">Results</h3>
                    <div className="list-group">
                        {results.map((result:any, index:number) => {
                            return (
                                <Link to={`/user/${result.userId}`} className="list-group-item list-group-item-action list-group-item-light text-decoration-none" key={index}>
                                    {result.username}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            );
        } else if (selectedOption === "song") {
            return (
                <div>
                    <ul className="list-group">
                        {results.map((track:any, index:number) => {
                            let playButton = (<div></div>);
                            let activeFlag = false;
                            if (track.uri === currentlyPlayingTrack) {
                                activeFlag = true;
                                playButton = (
                                    <button className="btn btn-outline-success no-border" style={{border: "none"}} onClick={(e) => {
                                        pauseSong();
                                    }}>
                                        <i className="fa fa-pause-circle fa-2x"></i>
                                    </button>
                                )
                            } else {
                                playButton = (
                                    <button className="btn btn-outline-success no-border" style={{border: "none"}} onClick={(e) => {
                                        playSong(track.uri);
                                    }}>
                                        <i className="fa fa-play-circle fa-2x"></i>
                                    </button>
                                )
                            }
                            return (
                                <li className={activeFlag ? "list-group-item text-center list-group-item-success" : "list-group-item text-center"} key={index}>
                                    <h5>
                                        {track.name}
                                        <img className="position-relative img-thumbnail float-end border rounded" width="20%" height="20%" src={track.album.images[0].url}></img>
                                    </h5>
                                    <h6>
                                        {track.artists[0].name}
                                    </h6>
                                    {playButton}
                                    <Link to="/post" className="btn btn-outline-success no-border position-relative justify-center fs-4 ms-1" style={{border: "none"}}>
                                        <i className="fa fa-share"></i>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )
        } else {
            return (<div></div>);
        }
    }

    const handleOptionChanges = (option:any, append:boolean) => {
        if (append) {
            const newOptions = searchOptions;
            newOptions.push(option);
            setSearchOptions(newOptions);
        } else {
            const newOptions = searchOptions;
            const index = newOptions.indexOf(option);
            newOptions.splice(index, 1);
            setSearchOptions(newOptions);
        }
        console.log(searchOptions);
    }

    const SpecificOptions = () => {
        if (selectedOption === "post") {
            return (
                <div className="form-check mb-3">
                    <input type="checkbox" className="form-check-input" id="postTitle" onClick={(e:any) => handleOptionChanges("title", e.target.checked)} />
                    <label className="form-check-label" htmlFor="postTitle">Post Title</label> <br />
                    <input type="checkbox" className="form-check-input" id="postAritst" onClick={(e:any) => handleOptionChanges("artist", e.target.checked)}/>
                    <label className="form-check-label" htmlFor="postArtist">Post Artist</label> <br />
                    <input type="checkbox" className="form-check-input" id="poster" onClick={(e:any) => handleOptionChanges("poster", e.target.checked)}/>
                    <label className="form-check-label" htmlFor="poster">Poster</label> <br />
                </div>
            )
        } else if (selectedOption === "user") {
            return (
                <div className="form-check mb-3">
                    <input type="checkbox" className="form-check-input" id="username" onClick={(e:any) => handleOptionChanges("username", e.target.checked)}/>
                    <label className="form-check-label" htmlFor="username">Username</label> <br />
                    <input type="checkbox" className="form-check-input" id="userID" onChange={(e) => handleOptionChanges("userId", e.target.checked)}/>
                    <label className="form-check-label" htmlFor="userID">User ID</label> <br />
                </div>
            )
        } else if (selectedOption === "song") {
            return (
                <div></div>
            )
        } else {
            return (<div></div>)
        }
    }

    const searchPosts = async () => {
        const response = await client.searchPosts(query, searchOptions.includes("title"), searchOptions.includes("artist"), searchOptions.includes("poster"));
        console.log(response);
        setResults(response);
    }

    const searchUsers = async () => {
        const response = await client.searchUsers(query, searchOptions.includes("username"), searchOptions.includes("userId"));
        console.log(response);
        setResults(response);
    }

    const searchSongs = async () => {
        let adjustedQuery = query;
        adjustedQuery = adjustedQuery.replaceAll(" ", "+");
        adjustedQuery = "q=" + adjustedQuery + "&type=track&limit=" + limit;
        const response = await client.searchSongs(adjustedQuery);
        console.log(response.tracks.items);
        setResults(response.tracks.items);
    }

    const initiateSearch = () => {
        if (selectedOption == "post") {
            searchPosts();
        } else if (selectedOption == "user") {
            searchUsers();
        } else if (selectedOption == "song") {
            searchSongs();
        }
        setSearchOptions([]);
    }

    useEffect(() => {

    }, [results]);

    return (
        <div className="feed-offset ms-3">
            <h1>Search</h1>
            <form>
                <div>
                    <label htmlFor="searchBar" className="form-label">Search for Posts, Users, or Songs</label>
                    <input id="searchBar" placeholder="Search" className="form-control mb-3" onChange={(e) => {
                        setQuery(e.target.value);
                    }}/>
                    <label htmlFor="searchOptions" className="form-label">Search Options</label>
                    <select id="searchOptions" className="form-select mb-3" onChange={(e) => {
                        setSelectedOption(e.target.value);
                        setSearchOptions([]);
                    }}>
                        <option>Select One...</option>
                        <option value="post">Post</option>
                        <option value="user">User</option>
                        <option value="song">Song</option>
                    </select>
                    <div id="optionValues">
                        {selectedOption !== "song" ? 
                        <div>Search By:</div> : <div></div>}
                        <SpecificOptions />
                    </div>
                    <button type="button" className="btn btn-success mt-3" onClick={initiateSearch}>
                        Search
                    </button>
                </div>
            </form>
            <div className="mt-3">
                {results.length > 0 ?
                <DisplayResults /> :
                <div> </div>
                }
            </div>
            <AuditoryModal text={modalText} showModal={showModal} onHide={handleModalShow} />
        </div>
    )
}

export default Search;