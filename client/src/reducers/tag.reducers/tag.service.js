import axios from "axios";

const API_URL = "http://localhost:5000/api/marketing/v1";
const API_USER = "http://localhost:5000/api/user/v1";


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

const getAllMarketingTagByLocation = async (token, location) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.get(API_USER + `/get/t/${location}`, config);
    return response.data.tagArray;
};

const setPriorityByCountry = async (token, priorityDetails) => {
    const { location, priorityChange } = priorityDetails;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.put(API_USER + `/set/priority/${location}`, { priorityChange }, config);
    return response.data.success;
};

const tagService = {
    createNewTag,
    getAllTags,
    deleteTag,
    getAllMarketingTagByLocation,
    setPriorityByCountry
};

export default tagService;