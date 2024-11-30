import mongoose from 'mongoose';

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/E-Auction';

const connectToDb = ()=> {
    mongoose.connect(mongoURI, {

    }).then(()=> {
        console.log("Successfully connected to mongodb.")
    }).catch(err=> console.error('Error in connecting to mongodb.', err))
};

export default connectToDb;