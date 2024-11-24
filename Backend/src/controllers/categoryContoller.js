import Category from '../models/category.js';



export const createCategory = async(req, res)=> {
    const { name } = req.body;

    try {
        const existingCategory = await Category.findOne({ name });
        if(!existingCategory) {
            return res.status(400).json({
                success: false,
                message: 'Category already exists.'
            });
        }  
        const category = await Category.create({ name });
        return res.sataus(201).json({
            success: true,
            message: 'Category created successfully.'
        });
    } catch (error) {
        console.error("Error in creating category:", error);
        return res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};


export const getAllCategories = async(req, res)=> {
    try {
        const categories = await Category.find();

        return res.status(200).json({
            success: true,
            data: categories
        });
    } catch (error) {
        console.error("Error in fetching categories:", error);
        return res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};


export const getCategoryById = async(req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findById(id);

        if(!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found.'
            });
        }

        return res.status(200).json({
            success: true,
            data: category
        });
    } catch (error) {
        console.error("Error in fetching category by id:", error);
        return res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};


export const updateCategory = async(req, res)=> {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const category = await Category.findByIdAndUpdate(
            id,
            { name },
            { new: true}
        );

        if(!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Category updated.'
        });
    } catch (error) {
        console.error("Error in updating category:", error);
        return res.status(500).jsoN({
            success: false,
            message: 'Server error.'
        });
    }
};


export const deleteCategory = async(req, res)=> {
    const { id } = req.params;
    try {
        const category = await Category.findByIdAndDelete(id);

        if(!category) {
            return res.status(404).jsoN({
                success: false,
                message: 'Category not found.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Category deleted successfully.'
        });
    } catch (error) {
        console.error('Error in deleting category:', error);
        return res.status(500).json({
            success: false,
            message: "Server error."
        });
    }
};