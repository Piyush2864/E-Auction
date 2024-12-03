import mongoose, { Schema } from 'mongoose';

const locationSchema = new Schema({
    city: {
        type: String,
        required: true
    },

    state: {
        type: String,
        required: true
    },

    country: {
        type: String,
        required: true
    },

    zipCode: {
        type: String
    }
});



const profileSchema = new Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    phoneNumber: {
        type: String,
        required: true,
    },

    location: {
        type: locationSchema,
        required: true
    },

    image: {
        type: String
    },

    
notification: [
    {
        message: String,
        read: {type: Boolean, default: false},
        createdAt:{type: Date, default: Date.now},
    }
],
}, { timestamps: true}
)

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;