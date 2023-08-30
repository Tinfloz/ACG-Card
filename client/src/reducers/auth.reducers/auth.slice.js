import { createAsyncThunk, createSlice, isPending } from "@reduxjs/toolkit";
import authService from "./auth.service";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: user ? user : null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ""
};

// register user 
export const register = createAsyncThunk("register/auth", async (creds, thunkAPI) => {
    try {
        return await authService.registerUser(creds);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    };
});

export const login = createAsyncThunk("login/auth", async (creds, thunkAPI) => {
    try {
        return await authService.loginUser(creds);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    };
});

export const setLoggedInUserRole = createAsyncThunk("role/auth", async (roleDetails, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await authService.setUserRole(token, roleDetails);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    };
});

export const subscribeUserTags = createAsyncThunk("subscribe/tag", async (tagDetails, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await authService.subscribeToTags(token, tagDetails);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    };
});

export const unsubscribeUserTags = createAsyncThunk("unsubscribe/tag", async (tagDetails, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await authService.unsubscribeTags(token, tagDetails);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    };
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetAuth: state => initialState,
        resetAuthHelpers: state => ({
            ...initialState,
            user: state.user
        })
    },
    extraReducers: builder => {
        builder
            .addCase(register.pending, state => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload
            })
            .addCase(login.pending, state => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload
            })
            .addCase(setLoggedInUserRole.pending, state => {
                state.pending = true;
            })
            .addCase(setLoggedInUserRole.fulfilled, (state, action) => {
                state.pending = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(setLoggedInUserRole.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.message = action.payload;
            })
            .addCase(subscribeUserTags.pending, state => {
                state.isLoading = true;
            })
            .addCase(subscribeUserTags.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const subscribedTags = [...state.user.subscribedTags, action.payload];
                const newUser = { ...state.user, subscribedTags }
                state.user = newUser;
            })
            .addCase(subscribeUserTags.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.message = action.payload;
            })
            .addCase(unsubscribeUserTags.pending, state => {
                state.isPending = true;
            })
            .addCase(unsubscribeUserTags.fulfilled, (state, action) => {
                state.isPending = false;
                state.isSuccess = true;
                const subscribedTags = action.payload;
                const newUser = { ...state.user, subscribedTags };
                state.user = newUser
            })
            .addCase(unsubscribeUserTags.rejected, (state, action) => {
                state.isPending = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
});

export const { resetAuth, resetAuthHelpers } = authSlice.actions;
export default authSlice.reducer;