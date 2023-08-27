import axios from "axios";

const API_URL = "http://localhost:5000/api/marketing/v1";

const createNewTag = async (token, tagDetails) => {
    console.log(tagDetails, "token");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.post(API_URL + "/create/tag", tagDetails, config);
    return response.data.tag
};

const tagService = {
    createNewTag
};

export default tagService;