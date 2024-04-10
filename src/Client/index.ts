
import axios from "axios";
import generateCryptoKeys from "./crypto";

const clientID = "08a8c25e8e4b41bba3e1b1e14e5dd2ee";
const redirect_uri = "http://localhost:4000/api/spcallback";

const api = axios.create({
    withCredentials: true
});

const API_BASE = "http://localhost:4000/api";

export const loginUser = async (userCredentials:any) => {
    try {
        const response = await api.post(`${API_BASE}/login`, userCredentials);
        return response.data;
    } catch (err) {
        return 400;
    }
}

export const logoutUser = async (userCredentials:any) => {
    try {
        const response = await api.post(`${API_BASE}/logout`, userCredentials);
    } catch(err) {
        return 400;
    }
}

export const getProfile = async () => {
    try {
        const response = await api.get(`${API_BASE}/profile`);
        return response.data;
    } catch (err) {
        return 400;
    }
}

export const connectSpotifyUser = async () => {
    let codeVerifier = "";
    let codeChallenge = "";
    await generateCryptoKeys().then((result) => {
        codeVerifier = result.verifier;
        codeChallenge = result.challenge;
        console.log("Generated codes");
    });

    console.log("Code verifier: " + codeVerifier);

    const scope = 'user-read-private user-read-email user-read-playback-state user-modify-playback-state';
    const authUrl = new URL("https://accounts.spotify.com/authorize");

    const params =  {
        response_type: 'code',
        client_id: clientID,
        scope: scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: redirect_uri,
    }

    console.log("Logging in user");
    const response = await api.post(`${API_BASE}/setCodeVerifier`, {codeVerifier: codeVerifier});

    if (response.status === 200) {
        authUrl.search = new URLSearchParams(params).toString();
        window.location.href = authUrl.toString();
    } else {
        return 400;
    }
}

export const getSpotifyUser = async () => {
    try {
        const response = await api.get(`${API_BASE}/spprofile`);
        return response.data;
    } catch (err) {
        return 400;
    }
}

export const getSpotifyPlaylists = async (userId:any) => {
    try {
        const response = await api.get(`${API_BASE}/spplaylists/${userId}`);
        return response.data;
    } catch (err) {
        return 400;
    }
}

export const getSpotifyTracks = async (playlistId:any) => {
    try {
        const response = await api.get(`${API_BASE}/sptracks/${playlistId}`);
        return response.data;
    } catch (err) {
        return 400;
    }
}

export const playSong = async (trackId:string) => {
    try {
        const response = await api.get(`${API_BASE}/spplaysong/${trackId}`);
        return response.data;
    } catch (err) {
        return 400; 
    }
}

export const pauseSong = async () => {
    try {
        const response = await api.get(`${API_BASE}/sppause`);
        return response.data;
    } catch (err) {
        return 400; 
    }
}

export const getLikedSongs = async () => {
    try {
        const response = await api.get(`${API_BASE}/splikedsongs`);
        return response.data;
    } catch (err) {
        return 400; 
    }
}