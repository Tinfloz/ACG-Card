import axios from "axios";

const API_URL = "http://localhost:5000/api/marketing/v1";

const createNewEvent = async (token, eventDetails) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.post(API_URL + "/create/event", eventDetails, config);
    return response.data;
};

const eventService = {
    createNewEvent
};

export default eventService;