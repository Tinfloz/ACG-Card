import axios from "axios";

const API_URL = "http://localhost:5000/api/marketing/v1";

const createNewTag = async (token, tagDetails) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.post(API_URL + "/create/tag", tagDetails, config);
    return response.data.tag
};

const getAllTags = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.get(API_URL + "/get/tags", config);
    return response.data.tags;
};

const deleteTag = async (token, tagName) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.delete(API_URL + `/delete/tag/${tagName}`, config);
    return response.data.tagName
};



const tagService = {
    createNewTag,
    getAllTags,
    deleteTag,
};

export default tagService;