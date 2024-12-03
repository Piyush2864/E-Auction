import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import connectToDb from '../Backend/src/db/config.js';
import cookieParser from 'cookie-parser';
import userRoute from '../Backend/src/routes/userRoutes.js';
// import sellerRoute from '../Backend/src/routes/sellerRoute.js';
import productRoute from '../Backend/src/routes/productRoute.js';
import categoryRoute from '../Backend/src/routes/categoryRoutes.js';
import bidRoute from '../Backend/src/routes/bidRoutes.js';
import auctonRoute from '../Backend/src/routes/auctionRoutes.js';
import adminRoute from '../Backend/src/routes/adminRoute.js';
import emailRoutes from '../Backend/src/routes/emailRoutes.js';
import buyerDashboardRoute from '../Backend/src/routes/buyerDashboardRoute.js';
// import sellerDashboardRoute from '../Backend/src/routes/sellerDashboardRoute.js';

// Load environment variables from the .env file
dotenv.configDotenv();

// Initialize the Express application
const app = express();

// Middleware setup

// const corsOptions = {
//     origin: 'http://localhost:5173',
//     Credential: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
// }
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Mount API routes
app.use('/api/v1/auction/user', userRoute);
// app.use('/api/v1/auction/seller', sellerRoute);
app.use('/api/v1/auction/product', productRoute);
app.use('/api/v1/auction/category', categoryRoute);
app.use('/api/v1/auction/bid', bidRoute);
app.use('/api/v1/auction/auction', auctonRoute);
app.use('/api/v1/auction/admin', adminRoute);
app.use('/api/v1/auction/admin', emailRoutes);
app.use('/api/v1/auction/buyer', buyerDashboardRoute);
// app.use('/api/v1/auction/seller', sellerDashboardRoute);

// Establish a connection to the database
connectToDb();

// Root route to test the server
app.get('/', (req, res) => {
    res.send('Hello world')
});

// Start the server and listen on the specified port
app.listen(process.env.PORT, ()=> {
    console.log(`Server is running on port ${process.env.PORt}`);
});