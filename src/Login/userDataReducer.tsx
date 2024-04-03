import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: {
        auditory: {
            username: "",
            userId: ""
        },
        spotify: {
            accessToken: ""
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
                userId: action.payload.userId
            };
        },
        setSpotifyUserData: (state, action) => {
            state.userData.spotify = {
                accessToken: action.payload.accessToken
            }
        }
    },
});

export const { setUserData, setSpotifyUserData } = userDataSlice.actions;

export default userDataSlice.reducer;