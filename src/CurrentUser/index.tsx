
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
                dispatch(setSpotifyUserData({accessToken: currentUser}));
                dispatch(setSpotifyLoggedIn(true));
            } else {
                await client.connectSpotifyUser();
                const currentUser = await client.getSpotifyUser();
                if (currentUser !== 400) {
                    dispatch(setSpotifyUserData({
                        accessToken: currentUser.accessToken,
                        user: {
                            username: currentUser.userData.display_name
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
            const currentUser = await client.getProfile();
            if (currentUser) {
                dispatch(setUserData(currentUser));
                dispatch(setLoggedIn(true));
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