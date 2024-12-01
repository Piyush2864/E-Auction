import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const getAuthConfig = ( getState)=> {
    const token = getState().auth.token;
    return {
        headers: {
            AUthorization: `Bearer ${token}`,
        }
    };
};


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


export const getBidsByAuctionId = createAsyncThunk(
    'bids/getByAuctionId',
    async(auctionId, thunkApi)=> {
        try {
            const { auth } = getState();
            if(auth.role !== 'admin') {
                return thunkApi.rejectWithValue('Only admins can view bids');
            }
            const config = getAuthConfig(getState);
            const response = await axios.get(`http://localhost:8000/api/v1/auction/admin/get-product-bids/${auctionId}`,
                config
            );
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data.message);
        }
    }
);


export const getUserBids = createAsyncThunk(
    'bids/getUserBids',
    async(_ , thunkApi)=> {
        try {
            const { auth } = getState();
            if(auth.role !== 'buyer'){
                return thunkApi.rejectWithValue('Only buyers can view their bids.');
            }
            const config = getAuthConfig(getState);
            const response = await axios.get(`http://localhost:8000/api/v1/auction/bid/user-bid/${auth.user.id}`,
                config
            );
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data.message);
        }
    }
);


const bidSlice = createSlice({
    name: 'bids',
    initialState: {
        userBids: [],
        auctionBids: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        resetBidState: (state)=> {
            state.userBids = [];
            state.auctionBids = [];
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(placeBid.pending, (state, action)=> {
            state.status = 'loading';
        })
        .addCase(placeBid.fulfilled, (state, action)=> {
            state.status = 'succeeded';
            state.userBids.push(action.payload);
        })
        .addCase(placeBid.rejected, (state, action)=> {
            state.status = 'failed';
            state.error = action.payload;
        })
        .addCase(getBidsByAuctionId.pending, (state, action)=> {
            state.status = 'loading';
        })
        .addCase(getBidsByAuctionId.fulfilled, (state, action)=> {
            state.status = 'succeeded';
            state.auctionBids = action.payload;
        })
        .addCase(getBidsByAuctionId.rejected, (state, action)=> {
            state.status = 'failed';
            state.error = action.payload;
        })
        .addCase(getUserBids.pending, (state, action)=> {
            state.status = 'loading';
        })
        .addCase(getUserBids.fulfilled, (state, action)=> {
            state.status = 'succeeded',
            state.userBids = action.payload;
        })
        .addCase(getUserBids.rejected, (state, action)=> {
            state.status = 'failed';
            state.error = action.payload;
        });
    }
});

export const { resetBidState } = bidSlice.actions;
export default bidSlice.reducer;