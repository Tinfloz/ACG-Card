import axios from "axios";

const API_URL = "http://localhost:5000/api/marketing/v1";
// const API_MARK = "http://localhost:5000/api/user/v1"

const createContent = async (token, content) => {
    const { tag, contentDetails } = content;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.post(API_URL + `/create/content/${tag}`, contentDetails, config);
    return response.data;
};

const getAllContentByTag = async (token, tag) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.get(API_URL + `/get/content/${tag}`, config);
    return response.data.content
};

const deleteContent = async (token, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.delete(API_URL + `/delete/content/${id}`, config);
    return response.data.contentId;
};



const contentService = {
    createContent,
    getAllContentByTag,
    deleteContent
};

export default contentService;