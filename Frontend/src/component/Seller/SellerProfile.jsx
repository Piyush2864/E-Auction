import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateSeller = () => {
    const [seller, setSeller] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSeller((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/v1/seller/create', seller, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.success) {
                setSuccess('Seller created successfully!');
                setError('');
                setTimeout(() => {
                    navigate('/seller-dashboard'); // Redirect to Seller Dashboard
                }, 2000);
            }
        } catch (err) {
            console.error('Error creating seller:', err);
            setError(err.response?.data?.message || 'Error creating seller');
            setSuccess('');
        }
    };

    return (
        <div >
            <h2 >Create Seller</h2>
            {error && <p >{error}</p>}
            {success && <p >{success}</p>}
            <form onSubmit={handleSubmit}>
                <div >
                    <label htmlFor="name">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={seller.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter seller name"
                    />
                </div>
                <div>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={seller.email}
                        onChange={handleChange}
                        required
                        
                        placeholder="Enter seller email"
                    />
                </div>
                <div>
                    <label htmlFor="phone">
                        Phone
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={seller.phone}
                        onChange={handleChange}
                        required
                        placeholder="Enter seller phone"
                    />
                </div>
                <div>
                    <label htmlFor="address">
                        Address
                    </label>
                    <textarea
                        id="address"
                        name="address"
                        value={seller.address}
                        onChange={handleChange}
                        required
                        placeholder="Enter seller address"
                    />
                </div>
                <button
                    type="submit"
                >
                    Create Seller
                </button>
            </form>
        </div>
    );
};

export default CreateSeller;
