
import * as client from '../Client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuditoryState } from '../store';
import { setSpotifyUserData, setUserData } from '../Login/userDataReducer';
import { setLoggedIn, setSpotifyLoggedIn } from '../Login/loginReducer';

function CurrentUser({ children }: { children:any }) {
    const dispatch = useDispatch();
    const { userData } = useSelector((state:AuditoryState) => state.userDataReducer);

    const fetchCurrentUser = async () => {
        try {
            const currentUser = await client.getSpotifyUser();
            if (currentUser !== 400) {
                dispatch(setSpotifyUserData({
                    accessToken: currentUser.accessToken,
                    user: {
                        username: currentUser.userData.display_name,
                        userId: currentUser.userData.id
                    }}));
                dispatch(setSpotifyLoggedIn(true));
            } else {
                console.log("User is not logged into Spotify... logging in now.");
                await client.connectSpotifyUser();
                const currentUser = await client.getSpotifyUser();
                if (currentUser !== 400) {
                    dispatch(setSpotifyUserData({
                        accessToken: currentUser.accessToken,
                        user: {
                            username: currentUser.userData.display_name,
                            userId: currentUser.userData.id
                        }
                    }));
                    dispatch(setSpotifyLoggedIn(true));
                } else {
                    dispatch(setSpotifyLoggedIn(false));
                }
            }
        } catch (error) {
            dispatch(setSpotifyUserData(null));
            dispatch(setSpotifyLoggedIn(false));
        }

        try {
            console.log("Checking if the user is signed into auditory");
            const currentUser = await client.getProfile();
            if (currentUser) {
                console.log("User is logged in");
                dispatch(setUserData(currentUser));
                dispatch(setLoggedIn(true));
            } else {
                console.log("User is not logged in");
                dispatch(setLoggedIn(false));
            }
        } catch (err) {
            dispatch(setUserData(null));
            dispatch(setLoggedIn(false));
        }
    };
    useEffect(() => {
        fetchCurrentUser();
    }, []);
    return children;
}

export default CurrentUser;