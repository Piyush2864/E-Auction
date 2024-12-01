import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";




const getAuthConfig = (getState) => {
    const token = getState().auth.token;
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};



export const fetchUserById = createAsyncThunk(
    'user/fetchById',
    async( userId, thunkApi) => {
        try {
            const config = getAuthConfig(getState);
            const response = await axios.get(
                `http://localhost:8000/api/v1/auction/user/get-user/${userId}`,
                config
            );
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data.message);
        }
    }
);


export const updateUser = createAsyncThunk(
    'user/update',
    async({ userId, userData}, thunkApi)=>{
        try {
            const config = getAuthConfig(getState);
            const response = await axios.put(
                `http://localhost:8000/api/v1/auction/user/update-user/${userId}`,
                userData,
                config
            );
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data.message);
        }
    }
);


export const deleteUser = createAsyncThunk(
    'user/delete',
    async( userId, thunkApi)=> {
        try {
            const config = getAuthConfig(getState);
            const response = await axios.delete(
                `http://localhost:8000/api/v1/auction/user/delete-user/${userId}`,
                config
            );
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data.message);
        }
    }
);



const userSlice = createSlice({
    name: 'user',
    initialState: {
      user: null, 
      status: 'idle',
      error: null,
    },
    reducers: {
      resetUserState: (state) => {
        state.user = null;
        state.status = 'idle';
        state.error = null;
      },
    },
    extraReducers: (builder) => {
      builder
    
        .addCase(fetchUserById.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchUserById.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.user = action.payload;
        })
        .addCase(fetchUserById.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        })
        
        .addCase(updateUser.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(updateUser.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.user = action.payload;
        })
        .addCase(updateUser.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        })
    
        .addCase(deleteUser.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(deleteUser.fulfilled, (state) => {
          state.status = 'succeeded';
          state.user = null;
        })
        .addCase(deleteUser.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        });
    },
  });
  
  export const { resetUserState } = userSlice.actions;
  
  export default userSlice.reducer;