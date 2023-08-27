import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import tagService from "./tag.service";

const initialState = {
    tag: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ""
};

export const createNewTag = createAsyncThunk("new/tag", async (tagDetails, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await tagService.createNewTag(token, tagDetails);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    };
});

const tagSlice = createSlice({
    name: "tag",
    initialState,
    reducers: {
        resetTags: state => initialState,
        resetTagHelpers: state => ({
            ...initialState,
            tag: state.tag
        })
    },
    extraReducers: builder => {
        builder
            .addCase(createNewTag.pending, state => {
                state.isLoading = true;
            })
            .addCase(createNewTag.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.tag = action.payload.tag
            })
            .addCase(createNewTag.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
});

export const { resetTags, resetTagHelpers } = tagSlice.actions;
export default tagSlice.reducer;
