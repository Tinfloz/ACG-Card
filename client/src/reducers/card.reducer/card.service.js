import axios from "axios";

const API_URL = "http://localhost:5000/api/card/v1";

const getAllContentForCard = async (associate, scanDetails) => {
    const response = await axios.post(API_URL + `/get/card/content/${associate}`, scanDetails);
    return response.data.content;
};

const cardService = {
    getAllContentForCard
};

export default cardService;