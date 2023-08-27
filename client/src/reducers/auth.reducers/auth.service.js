import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/v1";

const registerUser = async (creds) => {
    const response = await axios.post(API_URL + "/signUp", creds);
    if (response) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
    };
    return response.data.user
};

const loginUser = async (creds) => {
    const response = await axios.post(API_URL + "/signIn", creds);
    if (response) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
    };
    return response.data.user;
};

const authService = {
    registerUser, loginUser
};

export default authService;
