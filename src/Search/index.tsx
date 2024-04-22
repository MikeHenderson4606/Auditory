import { useState } from "react";
import * as client from '../Client';
import Song from "../Song";

function Search() {
    const [selectedOption, setSelectedOption] = useState<string>("");
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [searchOptions, setSearchOptions] = useState<string[]>([])

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
        if (selectedOption == "post") {
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
        } else if (selectedOption == "user") {
            return (
                <div className="form-check mb-3">
                    <input type="checkbox" className="form-check-input" id="username" onClick={(e:any) => handleOptionChanges("username", e.target.checked)}/>
                    <label className="form-check-label" htmlFor="username">Username</label> <br />
                    <input type="checkbox" className="form-check-input" id="userID" onChange={(e) => handleOptionChanges("userId", e.target.checked)}/>
                    <label className="form-check-label" htmlFor="userID">User ID</label> <br />
                </div>
            )
        } else if (selectedOption == "song") {
            return (
                <div className="form-check mb-3">
                    <input type="checkbox" className="form-check-input" id="title" onClick={(e:any) => handleOptionChanges("title", e.target.checked)} />
                    <label className="form-check-label" htmlFor="title">Title</label> <br />
                    <input type="checkbox" className="form-check-input" id="artist" onClick={(e:any) => handleOptionChanges("artist", e.target.checked)} />
                    <label className="form-check-label" htmlFor="artist">Artist</label> <br />
                </div>
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

    const searchUsers = () => {

    }

    const searchSongs = () => {

    }

    const search = () => {
        if (selectedOption == "post") {
            searchPosts();
        } else if (selectedOption == "user") {
            searchUsers();
        } else if (selectedOption == "song") {
            searchSongs();
        }
        setSearchOptions([]);
    }

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
                        Search By:
                        <SpecificOptions />
                    </div>
                    <button type="button" className="btn btn-success mt-3" onClick={search}>
                        Search
                    </button>
                </div>
            </form>
            <div className="mt-3">
                {results.length > 0 ?
                <div>
                    <h3 className="text-center">Results</h3>
                    <div className="list-group">
                        {results.map((result:any) => {
                            return (
                                <div className="list-group-item">
                                    <Song id={result.id} title={result.title} artist={result.title} poster={result.poster} posterId={result.posterId} linkTo={result.linkTo} description={result.description} />
                                </div>
                            );
                        })}
                    </div>
                </div> :
                <div> </div>
                }
            </div>
        </div>
    )
}

export default Search;