import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: {
        username: "",
        userId: ""
    },
};

const userDataSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.userData = {
                username: action.payload.username,
                userId: action.payload.userId
            };
        }
    },
});

export const { setUserData } = userDataSlice.actions;

export default userDataSlice.reducer;