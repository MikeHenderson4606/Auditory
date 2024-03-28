
import axios from "axios";

const api = axios.create({
    withCredentials: true
});

export const loginUser = async (userCredentials:any) => {
    try {
        const response = await api.post('http://localhost:4000/api/login', userCredentials);
        console.log(response.data);
        return response.data;
    } catch (err) {
        return 400;
    }
}

export const logoutUser = async (userCredentials:any) => {
    try {
        const response = await api.post('http://localhost:4000/api/logout', userCredentials);
    } catch(err) {
        return 400;
    }
}

export const getProfile = async () => {
    try {
        const response = await api.get('http://localhost:4000/api/profile');
        return response.data;
    } catch (err) {
        return 400;
    }
}

export const connectSpotifyUser = async () => {
    try {
        await api.get('http://localhost:4000/api/splogin');
        return 200;
    } catch (err) {
        return 400;
    }
}

export const getSpotifyUser = async () => {
    try {
        const response = await api.get('http://localhost:4000/api/spprofile');
        return response.data;
    } catch (err) {
        return 400;
    }
}