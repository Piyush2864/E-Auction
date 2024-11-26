import mongoose, { Schema } from 'mongoose';



const auctionSchema = new Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },

    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
        required: true
    },

    startingPrice: {
        type: Number,
        required: true
    },

    currentBid: {
        type: Number,
        default: 0
    },

    bidEndDate: {
        type: Date,
        required: true
    },

    bids: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Bid'
        }
    ],

    status: {
        type: String,
        enum: ['active', 'completed', 'cancelled'],
        default: 'active'
    },
}, {timestamps: true}
);

const Auction = mongoose.model('Auction', auctionSchema);

export default Auction;