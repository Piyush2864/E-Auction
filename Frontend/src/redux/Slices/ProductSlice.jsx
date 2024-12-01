import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const Base_URL = "http://localhost:8000/api/v1/auction/product";

const config = (getState)=> {
    const token = getState().auth.token;
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const createProduct = createAsyncThunk(
    'product/create',
    async(productData, thunkAPI) => {
        try {
            const {auth} = getState();
            if(auth.role !== 'seller'){
                return thunkAPI.rejectWithValue('Only sellercan add products.');
            }
            const response = await axios.post(`${Base_URL}/create-product`, productData, {
                headers: {
                    Authorization: `Bearer ${thunkAPI.getState().auth.token}`,
                },
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);


export const getProductById = createAsyncThunk(
    'product/getById',
    async(productId, thunkAPI) => {
        try {
            
            const response = await axios.get(`${Base_URL}/get-product/${productId}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);


export const getSellerProducts = createAsyncThunk(
    'product/getSellerProducts',
    async(sellerId, thunkAPI) => {
        try {
            const{ auth } = getState();
            if( auth.role !== 'seller'){
                return thunkAPI.rejectWithValue('Only seller can view their products.');
            }
            const response = await axios.get(`${Base_URL}/get-seller-product/${sellerId}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);


export const approveProduct = createAsyncThunk(
    'product/approveProduct',
    async(productId, thunkAPI)=> {
        try {
            const { auth } = getState();
            if( auth.role !== 'admin'){
                return thunkAPI.rejectWithValue('Only admin can approve products.');
            }
            const response = await axios.put(`http://localhost:8000/api/v1/auction/admin/approve-product/${productId}`,
                {
                    headers: {
                        Authorization: `Bearer ${thunkAPI.getState().auth.token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);


export const deleteProductById = createAsyncThunk(
    'product/deleteById',
    async(productId, thunkAPI) => {
        try {
            const response = await axios.delete(`${Base_URL}/delete-product/${productId}`, {
                headers: {
                    Authorization: `Bearer ${thunkAPI.getState().auth.token}`,
                },
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);



const productSlice = createSlice({
    name: 'product',
    initialstate: {
        products: [],
        product: null,
        sellerProducts: [],
        loading: false,
        error: null
    },
    reducers: {
        clearProductsState: (state)=> {
            state.products = [];
            state.product = null;
            state.sellerProducts = [];
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder)=> {
        builder
        .addCase(createProduct.pending, (state)=> {
            state.loading = true;
            state.error = null;
        })
        .addCase(createProduct.fulfilled, (state, action)=> {
            state.loading = fasle;
            state.products.push(action.payload);
        })
        .addCase(createProduct.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(getProductById.pending, (state)=> {
            state.loading = true;
            state.error = null;
        })
        .addCase(getProductById.fulfilled, (state, action)=> {
            state.loading = false;
            state.action = action.payload;
        })
        .addCase(getProductById.rejected, (state, action)=> {
            state.loadinng = false;
            state.error = action.payload;
        })
        .addCase(getSellerProducts.pending, (state)=> {
            state.loading = true;
            state.error = null;
        })
        .addCase(getSellerProducts.fulfilled, (state, action) => {
            state.loading = false,
            state.sellerProducts = action.payload;
        })
        .addCase(getSellerProducts.rejected, (state, action)=> {
            state.loading = false;
            state.error = action .payload;
        })
        .addCase(deleteProductById.pending, (state)=> {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteProductById.fulfilled, (state, action)=> {
            state.loading = false;
            state.products = state.products.filter((product)=> product._id !== action.meta.arg);
        })
        .addCase(deleteProductById.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { clearProductsState } = productSlice.actions;

export default productSlice.reducer;