import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/v1";
const API_USER_URL = "http://localhost:5000/api/user/v1"

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

const setUserRole = async (token, roleDetails) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.put(API_URL + "/set/role", roleDetails, config);
    const { role, userPhotoStr, linkedIn, bio } = response.data.details;
    const user = JSON.parse(localStorage.getItem("user"));
    const newUser = { ...user, role, userPhotoStr, linkedIn, bio };
    localStorage.setItem("user", JSON.stringify(newUser));
    return response.data.details;
}

const subscribeToTags = async (token, tagDetails) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.put(API_USER_URL + "/subscribe/tags", tagDetails, config);
    const user = JSON.parse(localStorage.getItem("user"));
    const newSubscribedTags = response.data.subscribedTags;
    const newUser = { ...user, subscribedTags: newSubscribedTags };
    localStorage.setItem("user", JSON.stringify(newUser));
    return response.data.subscribedTags
};

const unsubscribeTags = async (token, tagDetails) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.put(API_USER_URL + "/unsubscribe/tags", tagDetails, config);
    const user = JSON.parse(localStorage.getItem("user"));
    const newSubscribedTags = response.data.subscribedTags;
    const newUser = { ...user, subscribedTags: newSubscribedTags };
    localStorage.setItem("user", JSON.stringify(newUser));
    return response.data.subscribedTags;
};

const changeProfileDetails = async (token, changeDetails) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.put(API_URL + "/change/profile", changeDetails, config);
    const newUser = response.data.user;
    localStorage.setItem("user", JSON.stringify(newUser));
    return response.data.user;
};

const authService = {
    registerUser, loginUser, setUserRole, subscribeToTags, unsubscribeTags, changeProfileDetails
};

export default authService;
