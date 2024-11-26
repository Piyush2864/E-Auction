import mongoose, { Schema } from 'mongoose';


const sellerSchema = new Schema({
    name:{
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    phone: {
        type: String,
        required: true
    },

    address: {
        type: String
    },

    verified: {
        type: Boolean,
        default: false
    },

    listedProducts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
    ],

    joinDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true}
);

const Seller = mongoose.model('Seller', sellerSchema);

export default Seller;