import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: {
        auditory: false,
        spotify: false,
        admin: false
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
        },
        setAdmin: (state, action) => {
            state.isLoggedIn.admin = action.payload;
        }
    },
});

export const { setLoggedIn, setSpotifyLoggedIn, setAdmin } = loginSlice.actions;

export default loginSlice.reducer;