import mongoose, { Schema } from 'mongoose';



const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ['buyer', 'seller', 'admin'],
        default: 'buyer'
    },

    isSeller: {
        type: Boolean,
        default: false
    },

    sellerRequest: {
        type: Boolean,
        default: false
    },
    
    resetPasswordToken: {
        type: String
    },

    resetPasswordExpires: {
        type: String
    }
    
}, {timestamps: true},
);


const User = mongoose.model('User', userSchema);    

export default User;