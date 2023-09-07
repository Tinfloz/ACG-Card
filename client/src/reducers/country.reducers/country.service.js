import axios from "axios";

const API_URL = "http://localhost:5000/api/user/v1";

const getCountries = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.get(API_URL + '/get/countries', config);
    return response.data.countries;
};

const countryService = {
    getCountries
};

export default countryService;