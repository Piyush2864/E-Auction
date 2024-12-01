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


export const fetchAllCategories = createAsyncThunk(
    'category/fetchAll',
    async(_, thunkApi) => {
        try {
            const config = getAuthConfig(getState);
            const response = await axios.get('http://localhost:8000/api/v1/auction/category/all-category',
                config
            );
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data.message);
        }
    }
);


export const fetchCategoryById = createAsyncThunk(
    'category/fetchById',
    async(id, thunkApi)=> {
        try {
            const config = getAuthConfig(getState);
            const response = await axios.get(`http://localhost:8000/api/v1/auction/category/get-category/${id}`,
                config
            );
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data.messaeg);
        }
    }
);


export const createCategory = createAsyncThunk(
    'category/create',
    async(categoryDta, thunkApi)=> {
        try {
            const { auth } = getState();
            if(auth.role !== 'admin' && auth.role !== 'seller'){
                return thunkApi.rejectWithValue('Only admins and sellers can create categories');
            }
            const config = getAuthConfig(getState);
            const response = await axios.post(
                'http://localhost:8000/api/v1/auction/category/create-category',
                categoryDta,
                config
            );
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data.message);
        }
    }
);

export const deleteCategory = createAsyncThunk(
    'category/delete',
    async(id, thunkApi)=> {
        try {
            const { auth } = getState();
            if(auth.role !== 'admin'){
                return thunkApi.rejectWithValue('Only admins can delete categories');
            }
            const config = getAuthConfig(getState);
            const response = await axios.delete(`http://localhost:8000/api/v1/auction/category/delete/${id}`,
                config
            );
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data.message);
        }
    }
);


const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        currentCategory: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        resetCategoryState: (state) => {
            state.categories = [];
            state.currentCategory = null;
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchAllCategories.pending, (state, action)=> {
            state.status = 'loading';
        })
        .addCase(fetchAllCategories.fulfilled, (state, action)=> {
            state.status = 'succeeded';
            state.categories = action.payload;
        })
        .addCase(fetchAllCategories.rejected, (state, action)=> {
            state.status = 'failed',
            state.error = action.payload;
        })
        .addCase(fetchCategoryById.pending, (state, action)=> {
            state.status = 'loading';
        })
        .addCase(fetchCategoryById.fulfilled, (state, action)=> {
            state.status = 'succeeded';
            state.currentCategory = action.payload;
        })
        .addCase(fetchCategoryById.rejected, (state, action)=> {
            state.status = 'failed';
            state.error = action.payload;
        })
        .addCase(createCategory.pending, (state, action)=> {
            state.status = 'loading';
        })
        .addCase(createCategory.fulfilled, (state, action)=> {
            state.status = 'succeeded';
            state.categories = action.payload;
        })
        .addCase(createCategory.rejected, (state, action)=> {
            state.status = 'failed',
            state.error = action.payload;
        })
        .addCase(deleteCategory.pending, (state, action)=> {
            state.status = 'loading';
        })
        .addCase(deleteCategory.fulfilled, (state, action)=> {
            state.status = 'succeeded';
            state.categories = state.categories.filter((category)=> category.id !== action.payload.id);
        })
        .addCase(deleteCategory.rejected, (state, action)=> {
            state.status = 'failed';
            state.error = action.payload;
        });
    }
});

export const { resetCategoryState } = categorySlice.actions;

export default categorySlice.reducer;