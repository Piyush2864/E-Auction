import Profile from "../models/profile";
import User from "../models/userModel";




export const createProfile = async(req, res) => {
    try {
        const { userId, phoneNumber, location, image} = req.body;

        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({
                message: 'User not found.'
            });
        }

        const existingProfile = await Profile.findOne({userId});
        if(existingProfile) {
            return res.status(400).json({
                success: false,
                message: 'Profile not found.'
            });
        }

        const profile = new Profile({
            userId,
            phoneNumber,
            location,
            image
        });
        await profile.save();
        res.status(201).json({
            success: true,
            message: 'Profile created successfully.',
            data: profile
        });
    } catch (error) {
        console.error('Error creating profile.', error);
        res.status(500).json({
            success: false,
            message: 'Server error.'
        })
    }
};


export const getProfile = async (req, res) => {
    try {
        const { userId } = req.params;

        const profile = await Profile.findOne({ userId }).populate('userId', 'name email role');
        if (!profile) {
            return res.status(404).json({
                 success: false,
                 message: 'Profile not found' 
                });
        }

        res.status(200).json({ 
            success: true, 
            data: profile });
    } catch (error) {
        console.error('Error getting profile.', error);
        res.status(500).json({ 
            success: false,
             message: 'Server error', error: error.message });
    }
};


export const updateProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const updates = req.body;

        const profile = await Profile.findOneAndUpdate({ userId }, updates, { new: true });
        if (!profile) {
            return res.status(404).json({
                 success: false,
                 message: 'Profile not found'
                 });
        }

        res.status(200).json({
             success: true,
             data: profile
             });
    } catch (error) {
        console.error('Error updating profile.', error);
        res.status(500).json({
             success: false,
             message: 'Server error', error: error.message
             });
    }
};


export const deleteProfile = async (req, res) => {
    try {
        const { userId } = req.params;

        const profile = await Profile.findOneAndDelete({ userId });
        if (!profile) {
            return res.status(404).json({ success: false, message: 'Profile not found' });
        }

        res.status(200).json({
             success: true, 
             message: 'Profile deleted successfully'
             });
    } catch (error) {
        console.error('Error deleting profile.', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error', error: error.message 
        });
    }
};


export const addNotification = async (req, res) => {
    try {
        const { userId } = req.params;
        const { message } = req.body;

        const profile = await Profile.findOne({ userId });
        if (!profile) {
            return res.status(404).json({ success: false, message: 'Profile not found' });
        }

        profile.notification.push({ message });
        await profile.save();

        res.status(200).json({ 
            success: true, 
            data: profile 
        });
    } catch (error) {
        console.error('Error adding notification.', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error', error: error.message 
        });
    }
};


export const markNotificationAsRead = async (req, res) => {
    try {
        const { userId, notificationId } = req.params;

        const profile = await Profile.findOne({ userId });
        if (!profile) {
            return res.status(404).json({ 
                success: false, 
                message: 'Profile not found' 
            });
        }

        const notification = profile.notification.id(notificationId);
        if (!notification) {
            return res.status(404).json({ 
                success: false, 
                message: 'Notification not found' 
            });
        }

        notification.read = true;
        await profile.save();

        res.status(200).json({ 
            success: true, 
            data: profile 
        });
    } catch (error) {
        console.error('Error mark as read notification.', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error' 
        });
    }
};