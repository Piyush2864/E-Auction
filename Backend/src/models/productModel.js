import mongoose, { Schema } from 'mongoose';


const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
        required: true
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },

    bids: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Bid',
        },
      ],

    startingDate: {
        type: String,
        required: true
    },

    currentBid: {
        type: Number,
        default: 0,
        required: true
    },

    bidEndDate: {
        type: Date,
        required: true
    },

    listedDate: {
        type: Date,
        default: Date.now
    },

    soldDate: {
        type: Date
    },

    status: {
        type: String,
        enum: ['active', 'sold', 'expired'],
        default: 'active'
    },

    isInAuction: {
        type: Boolean,
        default: false
    },

    images: [
        {
            type: String
        }
    ],

    videos: [
        {
            type: String
        }
    ],

    auctionHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Auction'
        }
    ],
    
}, {timestamps: true}
);

const Product = mongoose.model('Product', productSchema);

export default Product;