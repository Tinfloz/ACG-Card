import axios from "axios";

const API_URL = "https://acg-card.onrender.com/api/marketing/v1";

const createNewEvent = async (token, eventDetails) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.post(API_URL + "/create/event", eventDetails, config);
    return response.data;
};

const getAllMarketingEventsByTag = async (token, tag) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.get(API_URL + `/get/events/${tag}`, config);
    return response.data.eventsArray;
};

const deleteEventByTag = async (token, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    // console.log(config, id)
    const response = await axios.delete(API_URL + `/delete/event/${id}`, config);
    return response.data.id;
};

const eventService = {
    createNewEvent, getAllMarketingEventsByTag, deleteEventByTag
};

export default eventService;