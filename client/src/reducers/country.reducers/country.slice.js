import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import countryService from "./country.service";

const initialState = {
    countries: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ""
};

export const getCountryList = createAsyncThunk("country/list", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await countryService.getCountries(token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    };
});

const countrySlice = createSlice({
    name: "country",
    initialState,
    reducers: {
        resetCountry: state => initialState,
        resetCountryHelpers: state => ({
            ...initialState,
            countries: state.countries
        })
    },
    extraReducers: builder => {
        builder
            .addCase(getCountryList.pending, state => {
                state.isLoading = true;
            })
            .addCase(getCountryList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.countries = action.payload;
            })
            .addCase(getCountryList.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.message = action.payload;
            })
    }
});

export const { resetCountry, resetCountryHelpers } = countrySlice.actions;
export default countrySlice.reducer