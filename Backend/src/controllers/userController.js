import User from '../models/userModel.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const registerUser = async(req, res) => {
    try {
        const { name, email, password } = req.body;

        if(!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required.'
            });
        }

        const userExists = await User.findOne({ email });

        if(userExists) {
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
            password: hashedPassword
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


export const loginUser = async(req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist."
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if(!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: 'invalid name and password.'
            });
        }

        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, { expiresIn: '1d'});

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


export const logOutUser = async(req, res)=> {
    
}