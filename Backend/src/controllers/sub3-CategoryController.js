import Sub3Category from '../models/sub3-CategoryModel.js';



export const createSubCategory = async (req, res) => {
    const { sub2CategoryId, modelName, price, warranty, details } = req.body;

    try {
        const sub3Category = await Sub3Category.create({
            sub2Category: sub2CategoryId,
            modelName,
            price,
            warranty,
            details
        });

        if(!sub3Category) {
            return res.status(404).json({
                success: false,
                message: 'Category not created.'
            });
        }

        return res.status(201).json({
            success: false,
            data: sub3Category
        })
    } catch (error) {
        console.error("Failed to create product details", error);
        return res.status(500).json({
            success: false,
            message: "Server error."
        });
    }
};


export const getProductsByBrand = async(req, res) => {
    const { sub2CategoryId } = req.params;
    try {
        const products = await Sub3Category.find({ sub2Category: sub2CategoryId});

        return res.status(200).json({
            success: true,
            data: products
        });
    } catch (error) {
        console.error('Failed to fetch products:', error);
        return res.status(500).json({
            success: false,
            message: "Server error."
        });
    }
};