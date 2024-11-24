import SubCategory1 from '../models/sub-CategoryModel.js'



export const createSubCategory = async(req, res) => {
    const { categoryId, name } = req.body;
    try {
        const existingSubCategory = await SubCategory1.findOne({ category: categoryId, name});

    if(!existingSubCategory) {
        return res.status(400).json({
            success: false,
            message: 'SubCategory already exixts for this category.'
        });
    }

    const subCategory = await SubCategory1.create({ category: categoryId, name});

    return res.status(201).json({
        success: true,
        message: 'Subcategory created successfully.',
        data: subCategory
    });
    } catch (error) {
       console.error("Error in creating subCategory:", error);
       return res.ststus(500).json({
        success: false,
        message: 'Server error.'
       });
    }
};


export const getSubCategoriesByCategory = async(req, res)=> {
    const { categoryId } = req.params;
    try {
        const subCategories = await SubCategory1.find({ category: categoryId});

        return res.status(200).json({
            success: true,
            data: subCategories
        });
    } catch (error) {
        console.error("Failed to fetch subcategories:", error);
        return res.status(500).json({
            success: false,
            message: 'Server error.'
        })
    }
}