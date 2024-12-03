import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        seller: '',  // Seller ID (typically logged-in user)
        category: '',  // Category ID selected from available categories
        startingDate: '',
        currentBid: 0,
        bidEndDate: '',
        images: [],
    });

    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Fetch categories from the API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/v1/categories');
                setCategories(response.data.data);
            } catch (err) {
                console.error('Error fetching categories', err);
            }
        };
        fetchCategories();
    }, []);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('http://localhost:8000/api/v1/auction/product/create-product', formData);
            setSuccess('Product added successfully!');
            setFormData({
                name: '',
                description: '',
                seller: '',
                category: '',
                startingDate: '',
                currentBid: 0,
                bidEndDate: '',
                images: [],
                videos: []
            });
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred while adding the product.');
        }
    };

    return (
        <div>
            <h2>Add Product</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Product Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Seller ID:</label>
                    <input
                        type="text"
                        name="seller"
                        value={formData.seller}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Category:</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Category</option>
                        {categories?.map(category => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Starting Date:</label>
                    <input
                        type="date"
                        name="startingDate"
                        value={formData.startingDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Current Bid:</label>
                    <input
                        type="number"
                        name="currentBid"
                        value={formData.currentBid}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Bid End Date:</label>
                    <input
                        type="date"
                        name="bidEndDate"
                        value={formData.bidEndDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Images (comma separated URLs):</label>
                    <input
                        type="text"
                        name="images"
                        value={formData.images}
                        onChange={handleChange}
                    />
                </div>

                
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;
