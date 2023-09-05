import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import eventService from "./event.service";

const initialState = {
    event: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ""
};

export const createNewMarketingEvent = createAsyncThunk("event/new", async (eventDetails, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await eventService.createNewEvent(token, eventDetails);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    };
});

export const getMyMarketingEvents = createAsyncThunk("event/tag", async (tag, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await eventService.getAllMarketingEventsByTag(token, tag);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    };
});

export const deleteMarketingEvent = createAsyncThunk("event/delete", async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await eventService.deleteEventByTag(token, id);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    };
});

const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {
        resetEvent: state => initialState,
        resetEventHelpers: state => ({
            ...initialState,
            event: state.event
        })
    },
    extraReducers: builder => {
        builder
            .addCase(createNewMarketingEvent.pending, state => {
                state.isLoading = true;
            })
            .addCase(createNewMarketingEvent.fulfilled, state => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(createNewMarketingEvent.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getMyMarketingEvents.pending, state => {
                state.isLoading = true;
            })
            .addCase(getMyMarketingEvents.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.event = action.payload;
            })
            .addCase(getMyMarketingEvents.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteMarketingEvent.pending, state => {
                state.isLoading = true;
            })
            .addCase(deleteMarketingEvent.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const newEventArray = state.event.filter(el => el._id !== action.payload);
                state.event = newEventArray;
            })
            .addCase(deleteMarketingEvent.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
});

export const { resetEvent, resetEventHelpers } = eventSlice.actions;
export default eventSlice.reducer;