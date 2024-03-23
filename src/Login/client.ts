
import axios from "axios";

export const loginUser = async (userCredentials:any) => {
    try {
        const response = await axios.post('http://localhost:4000/login', userCredentials);
        console.log(response.data);
        return response.data;
    } catch (err) {
        return 400;
    }
    
}