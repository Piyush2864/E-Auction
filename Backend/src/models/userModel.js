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

    notification: {
        type: String
    },

    notification: [
        {
            message: String,
            read: {type: Boolean, default: false},
            createdAt:{type: Date, default: Date.now},
        }
    ],
    
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