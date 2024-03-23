import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
};

const loginSlice = createSlice({
    name: "loggedIn",
    initialState,
    reducers: {
        setLoggedIn: (state) => {
            state.isLoggedIn = !state.isLoggedIn;
        }
    },
});

export const { setLoggedIn } = loginSlice.actions;

export default loginSlice.reducer;