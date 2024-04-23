
import axios from "axios";
import generateCryptoKeys from "./crypto";

const api = axios.create({
    withCredentials: true
});

export const API_BASE = process.env.REACT_APP_API_BASE;
console.log(API_BASE);
export const clientID = process.env.REACT_APP_CLIENT_ID || "";
export const redirect_uri = `${API_BASE}/spcallback`;

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

export const registerUser = async (userCredentials:any) => {
    try {
        const response = await api.post(`${API_BASE}/register`, userCredentials)
        return response.data;
    } catch (err) {
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

export const getUser = async (userId:number) => {
    try {
        const response = await api.get(`${API_BASE}/user/${userId}`)
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

export const getPostDetails = async (postId:string) => {
    try {
        const response = await api.get(`${API_BASE}/postdetails/${postId}`);
        return response.data;
    } catch (err) {
        return 400;
    }
}

export const getGenericPosts = async () => {
    try {
        const response = await api.get(`${API_BASE}/genericposts`);
        return response.data;
    } catch (err) {
        return 400;
    }
}

export const getPersonalPosts = async () => {
    try {
        const response = await api.get(`${API_BASE}/personalposts`);
        return response.data;
    } catch (err) {
        return 400;
    }
}

export const likePost = async (userId:number, postId:number) => {
    try {
        const response = await api.post(`${API_BASE}/likepost`, 
        {
            userId: userId,
            postId: postId
        });
        return response.data;
    } catch (err) {
        return 400;
    }
}

export const searchPosts = async (query:string, postTitle:boolean, postArtist:boolean, postPoster:boolean) => {
    try {
        const response = await api.get(`${API_BASE}/searchposts/${query}/${postTitle}/${postArtist}/${postPoster}`);
        return response.data;
    } catch (err) {
        return 400;
    }
}

export const searchUsers = async (query:string, userUsername:boolean, userUserId:boolean) => {
    try {
        const response = await api.get(`${API_BASE}/searchusers/${query}/${userUsername}/${userUserId}`);
        return response.data;
    } catch (err) {
        return 400;
    }
}

export const searchSongs = async (query:string) => {
    try {
        const response = await api.get(`${API_BASE}/searchsongs/${query}`);
        return response.data;
    } catch(err) {
        return 400;
    }
}