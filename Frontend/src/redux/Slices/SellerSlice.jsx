import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const getAuthConfig = (getState) => {
    const token = getState().auth.token;
    return{
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
};



export const fetchSellerById = createAsyncThunk(
    'seller/fetchById',
    async( id, thunkApi )=> {
        try {
            const config = getAuthConfig(getState);
            const response = await axios.get(
                `http://localhost:8000/api/v1/auction/seller/get-seller/${id}`,
                config
            );
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data.message);
        }
    }
);


export const createSeller = createAsyncThunk(
    'seller/create',
    async(sellerData, thunkApi)=> {
        try {
            const { auth } = getState();
            if(auth.role !== 'seller'){
                return thunkApi.rejectWithValue('Only sellers can create a profile.');
            }
            const config = getAuthConfig(getState);
            const response = await axios.post(
                'http://localhost:8000/api/v1/auction/seller/create-seller',
                sellerData,
                config
            );
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data.message);
        }
    }
);


export const updateSeller = createAsyncThunk(
    'seller/update',
    async({ id, sellerData}, thunkApi)=> {
        try {
            const { auth } = getState();
            if(auth.role !== 'seller'){
                return thunkApi.rejectWithValue('Only sellers can update their profiles.');
            }
            const config = getAuthConfig(getState);
            const response = await axios.put(
                `http://localhost:8000/api/v1/auction/seller/update-seller/${id}`,
                sellerData,
                config
            );
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data.message);
        }
    }
);


export const deleteSeller = createAsyncThunk(
    'seller/delete',
    async( id, thunkApi)=>{
        try {
            const { auth } = getState();
        if(auth.role !== 'seller'){
            return thunkApi.rejectWithValue('Only sellers can delete their profiles.');
        }
        const config = getAuthConfig(getState);
        const response = await axios.delete(`http://localhost:8000/api/v1/auction/seller/delete-seller/${id}`,
            config
        );
        return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data.message);
        }
    }
);



const sellerSlice = createSlice({
    name: 'seller',
    initialState: {
      seller: null, 
      status: 'idle',
      error: null,
    },
    reducers: {
      resetSellerState: (state) => {
        state.seller = null;
        state.status = 'idle';
        state.error = null;
      },
    },
    extraReducers: (builder) => {
      builder
        
        .addCase(fetchSellerById.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchSellerById.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.seller = action.payload;
        })
        .addCase(fetchSellerById.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        })
        
        .addCase(createSeller.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(createSeller.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.seller = action.payload;
        })
        .addCase(createSeller.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        })
        
        .addCase(updateSeller.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(updateSeller.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.seller = action.payload;
        })
        .addCase(updateSeller.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        })

        .addCase(deleteSeller.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(deleteSeller.fulfilled, (state) => {
          state.status = 'succeeded';
          state.seller = null;
        })
        .addCase(deleteSeller.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        });
    },
  });
  
  export const { resetSellerState } = sellerSlice.actions;
  
  export default sellerSlice.reducer;