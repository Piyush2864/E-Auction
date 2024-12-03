import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    location: {
        city: '',
        state: '',
        country: '',
        zipCode: '',
    },
    image: '',
    role: 'buyer', 
});

const [error, setError] = useState('');
const [success, setSuccess] = useState('');


const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('location.')) {
        const key = name.split('.')[1];
        setFormData((prev) => ({
            ...prev,
            location: { ...prev.location, [key]: value },
        }));
    } else {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }
};


const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
        const response = await axios.post('/api/v1/auth/register', formData);
        setSuccess(response.data.message);
    } catch (err) {
        setError(err.response?.data?.message || 'An error occurred');
    }
};

return (
    <div>
        <h2>Register</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}

        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label>City:</label>
                <input
                    type="text"
                    name="location.city"
                    value={formData.location.city}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label>State:</label>
                <input
                    type="text"
                    name="location.state"
                    value={formData.location.state}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label>Country:</label>
                <input
                    type="text"
                    name="location.country"
                    value={formData.location.country}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label>Zip Code:</label>
                <input
                    type="text"
                    name="location.zipCode"
                    value={formData.location.zipCode}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Profile Image URL:</label>
                <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Role:</label>
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                >
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                </select>
            </div>

            <button type="submit">Register</button>
        </form>
    </div>
);
};

export default Signup;
