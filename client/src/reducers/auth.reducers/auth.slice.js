import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
    }
});

export const { resetAuth, resetAuthHelpers } = authSlice.actions;
export default authSlice.reducer;