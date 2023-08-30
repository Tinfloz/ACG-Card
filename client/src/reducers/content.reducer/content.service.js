import axios from "axios";

const API_URL = "http://localhost:5000/api/marketing/v1";

const createContent = async (token, content) => {
    const { tag, contentStr } = content;
    console.log(content);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.post(API_URL + `/create/content/${tag}`, { contentStr }, config);
    return response.data;
}

const contentService = {
    createContent
};

export default contentService;