import mongoose, { Schema } from 'mongoose';



const bidSchema = new Schema({
    auction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auction',
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    bidTime: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true}
);

const Bid = mongoose.model('Bid', bidSchema);

export default Bid;