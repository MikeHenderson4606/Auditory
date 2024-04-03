import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: {
        auditory: false,
        spotify: false
    }
};

const loginSlice = createSlice({
    name: "loggedIn",
    initialState,
    reducers: {
        setLoggedIn: (state, action) => {
            state.isLoggedIn.auditory = action.payload;
        },
        setSpotifyLoggedIn: (state, action) => {
            state.isLoggedIn.spotify = action.payload;
        }
    },
});

export const { setLoggedIn, setSpotifyLoggedIn } = loginSlice.actions;

export default loginSlice.reducer;