import mongoose from 'mongoose';


const sub3CategorySchema = new Schema({
    sub2Category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory2',
        required: true
    },
    
    modelName: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    warranty: {
        type: String,
        required: true
    },

    details: {
        type: String,
        required: true, 
    }
}, {timestamps: true}
);

const Sub3Category = mongoose.model('Sub3Category', sub3CategorySchema);

export default Sub3Category