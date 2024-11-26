import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';


export const protect = async(req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split('')[1];

        if(!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied.'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');

        if(!req.user) {
            return res.status(401).json({
                success: false,
                message: 'User not found.'
            });
        }

        req.user = {
            id: req.user._id
        }

        next();
    } catch (error) {
        console.error('Authentication error.', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};