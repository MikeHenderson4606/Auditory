
import React, {useState, useEffect, useRef} from 'react';
import { useParams } from 'react-router-dom';
import SongDM from './SongDM';
import Modal from 'react-bootstrap/Modal';
import ProfileSearchComponent from './ProfileSearchComponent';
import SearchComponent from './SearchComponent';

import './index.css';

function Message() {
    const { userId } = useParams();
    const inputField = useRef<any>(null);
    let scrollToDiv;

    const [messageValue, setMessageValue] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showProfileSearch, setShowProfileSearch] = useState(true);
    const [activeTab, setActiveTab] = useState("profile");
    const [selectedPlaylist, setSelectedPlaylist] = useState({
        name: "",
        id: ""
    });
    const [selectedSong, setSelectedSong] = useState({
        title: "",
        artist: "",
        link: "",
        id: ""
    })
    const [messageChain, setMessageChain] = useState([
        {
            userId: 'user1',
            text: 'Message 1',
            sender: false
        },
        {
            userId: 'user1',
            text: 'Message 2',
            sender: true
        },
        {
            userId: 'user2',
            text: 'Message 3',
            sender: false
        },
        {
            userId: 'user2',
            text: 'Message 4',
            sender: true,
            song: {
                title: 'Cowgirls',
                artist: 'Morgan Wallen',
                link: 'https://Spotify.com',
                songId: 'songId1'
            }
        }
    ]);

    const sendMessage = () => {
        if (selectedSong.id !== "") {
            sendSelectedSong();
        }
        else if (messageValue.trim() !== "" && userId) {
            const message = messageValue;
            const messageJSON = {
                userId: userId,
                text: message,
                sender: true
            }
            let messageChainCopy = messageChain;
            setMessageValue("");
            messageChainCopy.push(messageJSON);
            setMessageChain(messageChainCopy);
        }
    }

    const checkForEnter=(event:any)=> {
        if (event.keyCode === 13) {
            sendMessage();
        }
    }

    const loadMessages = () => {
        return (
            <div style={{height: "525px", overflowY: "auto"}} className="border rounded mt-1" ref={(el) => {
            }}>
                {messageChain.map((message, index) => {
                    const alignIndex:React.CSSProperties = message.sender ? {
                        textAlign: "right",
                        paddingRight: "30px",
                        maxWidth: "300px",
                        wordWrap: "break-word",
                        borderRadius: "5px",
                        width: "fit-content",
                        padding: "5px",
                        position: "relative",
                        margin: "10px",
                        marginLeft: "auto",
                    } : {
                        textAlign: "left",
                        paddingLeft: "30px",
                        maxWidth: "300px",
                        wordWrap: "break-word",
                        borderRadius: "5px",
                        width: "fit-content",
                        padding: "5px",
                        margin: "10px"
                    };
                    if (userId === message.userId) {
                        return (
                            <div style={alignIndex} className={message.sender ? "bg-success-subtle" : "bg-body-secondary"} key={index}>
                                {(message.text !== "") ? <div>{message.text} <br /> </div> : <div> </div>}
                                {message.song ? <SongDM title={message.song.title} artist={message.song.artist} link={message.song.link} id={message.song.songId} /> : ""}
                            </div>
                        );
                    }
                    
                })}
                <div id="scrollToDiv" ref={(el) => scrollToDiv = el}></div>
            </div>
        );
    }

    const handleModalShow = () => {
        setShowModal(!showModal);
    }

    const showProfileSearchOptions = () => {
        setShowProfileSearch(true);
        setActiveTab("profile");
    }

    const showSearchOptions = () => {
        setShowProfileSearch(false);
        setActiveTab("search");
    }

    const sendSelectedSong = () => {
        if (selectedSong.id !== "" && userId) {
            const currSong = {
                userId: userId,
                text: messageValue,
                sender: true,
                song: {
                    title: selectedSong.title,
                    artist: selectedSong.artist,
                    link: selectedSong.link,
                    songId: selectedSong.id
            }
            }
            messageChain.push(currSong);
            setMessageValue("");
            setSelectedSong({
                title: "",
                artist: "",
                link: "",
                id: ""
            });
        }
    }

    useEffect(() => {
        inputField.current.focus();
    }, []);

    const scrollDiv = document.getElementById("scrollToDiv");
    scrollDiv?.scrollIntoView({behavior: "smooth", block: "end"});

    return (
        <div className="messenger-height position-relative">
            <div>
                {loadMessages()}
            </div>
            <div>
                {selectedSong.id !== "" ?
                    <>
                        <div className="my-1">
                            <SongDM title={selectedSong.title} artist={selectedSong.artist} link={selectedSong.link} id={selectedSong.id} />
                        </div>
                    </> :
                    <div></div>
                }
                <div className="input-group position-relative mt-2" style={{position: "absolute", bottom: 5}}>
                    
                    <input autoFocus ref={inputField} className="form-control" placeholder="Message" value={messageValue} onKeyDown={(e) => {
                        checkForEnter(e)
                    }} onChange={(e) => 
                        setMessageValue(e.target.value)
                    } />
                    <button className="btn btn-warning" onClick={() => {
                        handleModalShow();
                    }}>
                        Attach Song
                    </button>
                    <button className="btn btn-success" onClick={() => {
                        sendMessage();
                    }}>
                        Send
                    </button>
                </div>
            </div>
            <Modal show={showModal} onHide={handleModalShow}>
                <Modal.Header closeButton>
                    <Modal.Title>Select a Song</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <button className={activeTab === "profile" ? "nav-link active" : "nav-link"} onClick={showProfileSearchOptions}>From Profile</button>
                        </li>
                        <li className="nav-item">
                            <button className={activeTab === "search" ? "nav-link active" : "nav-link"} onClick={showSearchOptions}>From Search</button>
                        </li>
                    </ul>
                    {showProfileSearch ? <ProfileSearchComponent selectedSong={selectedSong} selectedPlaylist={selectedPlaylist} setSelectedSong={setSelectedSong} setSelectedPlaylist={setSelectedPlaylist} /> : <SearchComponent />}
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-danger' onClick={() => {
                        handleModalShow();
                        setSelectedSong({
                            title: "",
                            artist: "",
                            link: "",
                            id: ""
                        });
                    }}>
                        Cancel
                    </button>
                    <button className='btn btn-success' onClick={() => {
                        handleModalShow();
                    }}>
                        Attach
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Message;