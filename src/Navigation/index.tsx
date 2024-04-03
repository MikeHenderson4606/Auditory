
import { Link } from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AuditoryState } from '../store';
import * as client from '../Client';
import { setLoggedIn } from '../Login/loginReducer';
import { setUserData } from '../Login/userDataReducer';

function Navigation() {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state:AuditoryState) => state.loginReducer);
    const { userData } = useSelector((state:AuditoryState) => state.userDataReducer);
    const isSpotLoggedIn = true;

    var options = [
        {
            text: 'Login',
            destination: '/login'
        },
        {
            text: 'Profile',
            destination: '/profile'
        }
    ]

    if (!isLoggedIn.spotify) {
        options.push(
            {
                text: 'Connect to Spotify',
                destination: '/'
            }
        )
    }

    if (isLoggedIn.auditory) {
        options = options.slice(1);
        options.push({
            text: 'Logout',
            destination: '/api/logout'
        })
    }

    const spotifyLogin = () => {
        client.connectSpotifyUser();
    }

    const logout = () => {
        client.logoutUser(userData);
        alert("You have been successfull logged out");
    }

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    }

    useEffect(() => {
        const getProfile = async () => {
            return await client.getProfile();
        };
        getProfile().then((user) => {
            if (user) {
                dispatch(setUserData(user));
                dispatch(setLoggedIn(true));
            } else {
                dispatch(setUserData({}));
                dispatch(setLoggedIn(false));
            }
        }).catch((error) => {
            dispatch(setUserData({}))
            dispatch(setLoggedIn(false));
        });
    }, []);

    return (
        <nav className="navbar navbar-expand-md bg-success-subtle border-dark border-bottom">
            <div className="container-fluid">
                <Link className="navbar-brand fs-3 ms-5" to="/">Auditory</Link>
                <button className="navbar-toggler" type="button" onClick={toggleCollapse}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isCollapsed ? '' : 'show'}`} id="navbarNav">
                    <div className="navbar-nav ms-auto">
                        {options.map((option, index) => {
                            if (option.text === "Logout") {
                                return (
                                    <button className="nav-link fs-4 me-5" key={index} onClick={() => {
                                        logout();
                                        dispatch(setLoggedIn(false));
                                    }}>{option.text}</button>
                                )
                            } else if (option.text === "Connect to Spotify") {
                                return (
                                    <Link to={option.destination} className="nav-link fs-4 me-5" key={index} onClick={spotifyLogin}>{option.text}</Link>
                                );
                            } else {
                                return (
                                    <Link to={option.destination} className="nav-link fs-4 me-5" key={index}>{option.text}</Link>
                                );
                            }
                        })}
                    </div>
                </div>
            </div>
        </nav> 
    );
}

export default Navigation;