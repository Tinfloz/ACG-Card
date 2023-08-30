import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import contentService from "./content.service";

const initialState = {
    content: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ""
};

export const createMarketingCollateral = createAsyncThunk("content/create", async (content, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await contentService.createContent(token, content);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    };
});

const contentSlice = createSlice({
    name: "content",
    initialState,
    reducers: {
        resetContent: state => initialState,
        resetContentHelpers: state => ({
            ...initialState,
            content: state.content
        })
    },
    extraReducers: builder => {
        builder
            .addCase(createMarketingCollateral.pending, state => {
                state.isLoading = true;
            })
            .addCase(createMarketingCollateral.fulfilled, state => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(createMarketingCollateral.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
});

export const { resetContent, resetContentHelpers } = contentSlice.actions;
export default contentSlice.reducer
