import mongoose from 'mongoose';


const sub2CategorySchema = new Schema({
    subCategory:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory1',
        required: true
    },

    brand: {
        type: String,
        required: true,
        // unique: true
    }
}, {timestamps: true}
);

const SubCategory2 = mongoose.model("SubCategory2", sub2CategorySchema);

export default SubCategory2;