
import React, {useState, useEffect, useRef} from 'react';
import { useParams } from 'react-router-dom';
import SongDM from './SongDM';

import './index.css';

function Message() {
    const { userId } = useParams();
    const inputField = useRef<any>(null);
    let scrollToDiv;

    const [messageValue, setMessageValue] = useState("");
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
        if (messageValue.trim() !== "" && userId) {
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
                            <>
                                <p style={alignIndex} className={message.sender ? "bg-success-subtle" : "bg-body-secondary"} key={index}>
                                    {message.text} <br />
                                    {message.song ? <SongDM title={message.song.title} artist={message.song.artist} link={message.song.link} id={message.song.songId} /> : ""}
                                </p>
                            </>
                        );
                    }
                    
                })}
                <div id="scrollToDiv" ref={(el) => scrollToDiv = el}></div>
            </div>
        );
    }
    useEffect(() => {
        console.log("focusing input");
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
                <div className="input-group" style={{position: "absolute", bottom: 5}}>
                    <input autoFocus ref={inputField} className="form-control" placeholder="Message" value={messageValue} onKeyDown={(e) => {
                        checkForEnter(e)
                    }} onChange={(e) => 
                        setMessageValue(e.target.value)
                    } />
                    <button className="btn btn-warning">
                        Attach Song
                    </button>
                    <button className="btn btn-success" onClick={() => {
                        sendMessage();
                    }}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Message;