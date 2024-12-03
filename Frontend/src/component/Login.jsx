import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/auction/user/login',
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Response:', response.data); // Debugging log

      const { success, token ,data } = response.data;
      const {role} = data
      console.log(role,"roleeeeeeeeeeeeee")
      console.log(success,token)

      if (success) {
        // Save token to localStorage
        localStorage.setItem('token', token);

        // Redirect based on role
        switch (role) {
          case 'admin':
            console.log("first")
            navigate('/admin-dashboard');
            break;
          case 'buyer':
            console.log("second")
            navigate('/home');
            break;
          default:
            setError('Invalid role');
        }

        setSuccess(true);
        setError(null); // Clear any error message
        setUserData({ email: '', password: '' }); // Reset form fields
      }
    } catch (error) {
      // Handle errors
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {success && <p>Login successful</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
