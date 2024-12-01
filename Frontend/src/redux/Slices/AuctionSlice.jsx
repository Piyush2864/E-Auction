import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const getAuthConfig = (getState) => {
    const token = getState().auth.token;
    return {
        Headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};



export const fetchAllAuctions = createAsyncThunk(
    'auctions/fetchAll',
    async(_, thunkApi) => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/auction/auction/all-auction');
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data.message);
        }
    }
);


export const createAuction = createAsyncThunk(
    'auctions/create',
    async(auctionsData, thunkApi)=> {
        try {
            const { auth } = getState();
            if(auth.role !== 'seller'){
                return thunkApi.rejectWithValue('Only admin can create auctions.');
            }
            const config = getAuthConfig(getState);
            const response = await axios.post(
                'http://localhost:8000/api/v1/auction/auction/create-auction',
                auctionsData,
                config
            );
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data.message);
        }
    }
);


export const fetchAuctionById = createAsyncThunk(
    'auctions/fetchById',
    async(auctionId, thunkApi)=> {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/auction/auction/getauction/${auctionId}`);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data.message);
        }
    }
);


export const updateAuctionStatus = createAsyncThunk(
    'auctions/updateStatus',
    async({ auctionId, status}, thunkApi)=> {
        try {
            const { auth } = getState();
            if(auth.role !== 'admin') {
                return thunkApi.rejectWithValue('Only admin can update auction status.');
            }
            const config = getAuthConfig(getState);
            const response = await axios.put(
                `http://localhost:8000/api/v1/auction/auction/status-update/${auctionId}`,
                { status },
                config
            );
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data.message);
        }
    }
);


export const deleteAuction = createAsyncThunk(
    'auctions/delete',
    async(auctionId, thunkApi) => {
        try {
            const { auth } = getState();
            if(auth.role !== 'admin') {
                return thunkApi.rejectWithValue('Only admin can delete auctions.');
            }
            const config = getAuthConfig(getState);
            const response = await axios.delete(`http://localhost:8000/api/v1/auction/auction/delete-auction/${auctionId}`,
                config
            );
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data.message);
        }
    }
);


export const placeBid = createAsyncThunk(
    'auctions/placeBid',
    async({ auctionId, bidAmount}, thunkApi)=> {
        try {
            const { auth } = getState();
            if(auth.role !== 'buyer') {
                return thunkApi.rejectWithValue('Only buyer can place buds.');
            }
            const config = getAuthConfig(getState);
            const response = await axios.post('http://localhost:8000/api/v1/auction/bid/place-bid',
                { auctionId, bidAmount},
                config
            );
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data.message);
        }
    }
);


const auctionSlice = createSlice({
    name: 'auctions',
    initialState: {
        auctions: [],
        currentAuction: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        resetAuctionState: (state)=> {
            state.auctions = [],
            state.currentAuction = null,
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchAllAuctions.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchAllAuctions.fulfilled, (state, action)=> {
            state.status = 'succeeded';
            state.auctions = action.payload;
        })
        .addCase(fetchAllAuctions.rejected, (state, action)=> {
            state.status = 'failed';
            state.error = action.payload;
        })
        .addCase(createAuction.pending, (state, action)=> {
            state.status = 'loading';
        })
        .addCase(createAuction.fulfilled, (state, action)=> {
            state.status = 'succeeded';
            state.auctions.push(action.payload);
        })
        .addCase(createAuction.rejected, (state, action)=> {
            state.status = 'failed';
            state.error = action.payload;
        })
        .addCase(fetchAuctionById.pending, (state, action)=> {
            state.status = 'loading';
        })
        .addCase(fetchAuctionById.fulfilled, (state, action)=> {
            state.status = 'succeeded';
            state.currentAuction = action.payload;
        })
        .addCase(fetchAuctionById.rejected, (state, action)=> {
            state.status ='failed';
            state.error = action.payload;
        })
        .addCase(updateAuctionStatus.pending, (state, action)=> {
            state.status = 'loading';
        })
        .addCase(updateAuctionStatus.fulfilled, (state, action)=> {
            state.status = 'succeeded';
            const index = state.auctions.findIndex((auction)=> auction._id === action.payload._id);
            if(index !== -1) {
                state.auctions[index] = action.payload;
            }
        })
        .addCase(updateAuctionStatus.rejected, (state, action)=> {
            state.status = 'failed';
            state.status = action.payload;
        })
        .addCase(deleteAuction.pending, (state, action)=> {
            state.status = 'loading';
        })
        .addCase(deleteAuction.fulfilled, (state, action)=> {
            state.status = 'succeeded';
            state.auctions = state.auctions.filter((auction)=> auction._id !== action.payload._id);
        })
        .addCase(deleteAuction.rejected, (state, action)=> {
            state.status = 'failed';
            state.error = action.payload;
        })
        .addCase(placeBid.pending, (state, action)=> {
            state.status = 'loading';
        })
        .addCase(placeBid.fulfilled, (state, action)=> {
            state.status = 'succeeded';
            if(state.currentAuction && state.currentAuction._id === action.payload.auctionId) {
                state.currentAuction.bids.push(action.payload);
            }
        })
        .addCase(placeBid.rejected, (state, action)=> {
            state.status = 'failed';
            state.error = action.payload;
        });
    }
});

export const { resetAuctionState } = auctionSlice.actions;

export default auctionSlice.reducer;