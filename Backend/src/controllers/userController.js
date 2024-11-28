import User from '../models/userModel.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';


export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required.'
            });
        }

        const validRoles = ['buyer', 'seller', 'admin'];
        if (role && !validRoles.includes(role)) {
            return res.status(400).json({ message: 'Invalid role specified.' });
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists."
            });
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role
        });

        const user = await newUser.save();

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user
        });
    } catch (error) {
        console.error("Error in creating user:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist."
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: 'invalid name and password.'
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 3600000,
            samesite: 'strict'
        });

        return res.status(200).json({
            success: true,
            message: "Login successfully.",
            token,
            data: user
        });
    } catch (error) {
        console.log('Error during login:', error);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};


export const logOutUser = async (req, res) => {

};


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});


const generateResetToken = () => {
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha26').update(resetToken).digest('hex');
    return { resetToken, hashedToken };
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User with this email does not exist.'
            });
        }

        const { resetToken, hashedToken } = generateResetToken();

        const resetTokenExpiry = date.now() + 15 * 60 * 1000;

        user.resetTokenExpiry = hashedToken;
        user.resetPasswordExpires = resetTokenExpiry;

        await user.save();

        const resetUrl = `${req.protocol}://${req.get(
            'host'
        )}/api/users/reset-password/${resetToken}`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset Request',
            text: `You requested a password reset. Please click the following link to reset your password: ${resetUrl}\n\nIF you didn't request this, please ignore this email.`,
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({
            success: true,
            message: 'Password reset link has been sent to your email.'
        });
    } catch (error) {
        console.error('Error in forgot password:', error);
        return res.status(500).json({
            success: false,
            message: 'Server  error. Please try again later.'
        });
    }
};


export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword, confirmPassword } = req.body;

    try {
        
        if (!newPassword || newPassword.length < 8) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 8 characters long.',
            });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Passwords do not match.',
            });
        }

        
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired reset token.',
            });
        }

    
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;
        user.password = await bcrypt.hash(newPassword, saltRounds);

        // Clear the reset token and expiry
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

    
        await user.save();


        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: 'yourapp@example.com',
            to: user.email,
            subject: 'Password Reset Confirmation',
            text: 'Your password has been successfully reset. If this was not you, please contact support immediately.',
        });

        return res.status(200).json({
            success: true,
            message: 'Password has been reset successfully.',
        });
    } catch (error) {
        console.error('Error in reset password:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
        });
    }
};


export const addNotification = async (req, res) => {
    const { userId, message } = req.body;

    try {

        if (!userId || !message) {
            return res.status(400).json({
                success: false,
                message: 'User ID and message are required'
            });
        }


        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $push: {
                    notifications: {
                        message,
                        read: false,
                    },
                },
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            message: 'Notification added successfully',
            notifications: updatedUser.notifications,
        });
    } catch (error) {
        console.error('Error adding notification:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
