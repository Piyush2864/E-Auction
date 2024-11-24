import SubCategory2 from '../models/sub2-CategoryModel.js';



export const createSubCategory2 = async(req, res)=> {
    const { SubCategoryId, brand } = req.body;
    try {
        const existingBrand = await SubCategory2.findOne({ subCategory: SubCategoryId, brand});

        if(!existingBrand) {
            return res.status(400).json({
                success: false,
                message: 'Brand already exists for this subcategory.'
            });
        }

        const subCategory2 = await SubCategory2.create({ subCategory: SubCategoryId, brand });
        return res.status(201).json({
            success: true,
            data: subCategory2
        });
    } catch (error) {
        console.error("Failed to create subcategory level 2:", error);
        return res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};