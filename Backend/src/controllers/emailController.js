import nodemailer from 'nodemailer';
import Product from '../models/productModel.js'
import User from '../models/userModel.js'


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendEmailNotification = async(buyerEmail, products) => {
    const productNames = products.map(product=> product.name).join(', ');

    const mailOptions= {
        from: process.env.EMAIL_USER,
        to: buyerEmail,
        subject: 'Upcoming Auction Products',
        text: `We are excited to announce the following products in our upcoming auction: ${productNames}. Don't miss out!`,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console,error('Error ending email:', error);
    }
};


export const notifyBuyerAboutAuction = async(req, res) =>{
    try {
        const productsForauction = await Product.find({ isInAuction: true });

        const buyers = await User.find({ role: 'buyes'});

        for (const buyer of buyers) {
            await sendEmailNotification(buyer.email, productsForauction);
        }

        return res.status(200).json({
            success: true,
            message: 'Buyers notified about upcoming auction.'
        });
    } catch (error) {
        console.error('Error notifying buyers:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while notifying buyers.'
        });
    }
};