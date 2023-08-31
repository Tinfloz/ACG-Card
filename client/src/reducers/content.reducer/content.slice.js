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

export const getMarketingCollateralsByTag = createAsyncThunk("content/get", async (tag, thunkAPI) => {
    try {
        console.log(tag)
        const token = thunkAPI.getState().auth.user.token;
        return await contentService.getAllContentByTag(token, tag);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    };
});

export const deleteMarketingCollaterals = createAsyncThunk("content/delete", async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await contentService.deleteContent(token, id);
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
            .addCase(getMarketingCollateralsByTag.pending, state => {
                state.isLoading = true;
            })
            .addCase(getMarketingCollateralsByTag.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.content = action.payload;
            })
            .addCase(getMarketingCollateralsByTag.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteMarketingCollaterals.pending, state => {
                state.isLoading = true;
            })
            .addCase(deleteMarketingCollaterals.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const newContentArray = state.content.filter(el => el._id !== action.payload);
                state.content = newContentArray;
            })
            .addCase(deleteMarketingCollaterals.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
});

export const { resetContent, resetContentHelpers } = contentSlice.actions;
export default contentSlice.reducer
