import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: {
        auditory: {
            username: "",
            userId: "",
            likedPosts: []
        },
        spotify: {
            accessToken: "",
            user: {
                username: "",
                userId: ""
            }
        }
    },
};

const userDataSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.userData.auditory = {
                username: action.payload.username,
                userId: action.payload.userId,
                likedPosts: action.payload.likes
            };
        },
        setSpotifyUserData: (state, action) => {
            state.userData.spotify = {
                accessToken: action.payload.accessToken,
                user: {
                    username: action.payload.user.username,
                    userId: action.payload.user.userId
                }
            }
        }
    },
});

export const { setUserData, setSpotifyUserData } = userDataSlice.actions;

export default userDataSlice.reducer;