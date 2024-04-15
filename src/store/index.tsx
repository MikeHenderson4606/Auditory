import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../Login/loginReducer";
import userDataReducer from "../Login/userDataReducer";

export interface AuditoryState {
  loginReducer: {
    isLoggedIn: {
      auditory: boolean,
      spotify: boolean
    };
  },
  userDataReducer: {
    userData: {
      auditory: {
        username: string,
        userId: number
      },
      spotify: {
        accessToken: string,
        user: {
          username: string,
          userId: string
        }
      } 
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