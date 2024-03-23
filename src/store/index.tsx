import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../Login/loginReducer";
import userDataReducer from "../Login/userDataReducer";

export interface AuditoryState {
  loginReducer: {
    isLoggedIn: boolean;
  },
  userDataReducer: {
    userData: {
      username: "",
      userId: ""
    }
  }
}
const store = configureStore({
  reducer: {
    loginReducer,
    userDataReducer
  },
});

export default store;