import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';


export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async(userData, thunkApi) => {
        try {
            const response = await axios.post(`http://localhost:8000/api/v1/auction/user/register`,
                userData,
                { withCredentials: true}
            );
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data.message);
        }
    }
);


export const login = createAsyncThunk('auth/login', async(credentials, thunkApi) => {
    try {
        const response = await axios.post('http://localhost:8000/api/v1/auction/user/login', credentials);
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data);
    }
});


const authSlice = createSlice({
    name: 'auth',
    initialState:{
        user: null,
        token: null,
        role: null,
        isAuthenticated: false,
        loading: false,
        error: null,
    },

    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.role = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder
        .addCase(registerUser.pending, (state)=> {
            state.loading = true;
            state.error = null;
        })
        .addCase(registerUser.fulfilled, (state, action)=> {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.role = action.payload.user.role;
            state.isAuthenticated = true
        })
        .addCase(registerUser.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(login.pending, (state)=> {
            state.loading = true;
            state.error = null;
        })
        .addCase(login.fulfilled, (state, action)=> {
            state.loading = false,
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.role = action.payload.user.role;
            state.isAuthenticated = true;
        })
        .addCase(login.rejected, (state)=> {
            state.loading = false,
            state.error = action.payload;
        });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;