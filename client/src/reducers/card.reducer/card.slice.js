import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cardService from "./card.service";

const initialState = {
    content: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ""
};

export const getAllCardContentScanned = createAsyncThunk("card/scan", async (scanDetails, thunkAPI) => {
    try {
        const { associate, userDetails } = scanDetails;
        console.log(userDetails);
        return await cardService.getAllContentForCard(associate, userDetails);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    };
});

const cardSlice = createSlice({
    name: "card",
    initialState,
    reducers: {
        resetCard: state => initialState,
        resetCardHelpers: state => ({
            ...initialState,
            content: state.content
        })
    },
    extraReducers: builder => {
        builder
            .addCase(getAllCardContentScanned.pending, state => {
                state.isLoading = true;
            })
            .addCase(getAllCardContentScanned.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.content = action.payload;
            })
            .addCase(getAllCardContentScanned.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    }
});

export const { resetCard, resetCardHelpers } = cardSlice.actions;
export default cardSlice.reducer;