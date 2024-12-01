import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, registerUser } from "../redux/Slices/AuthSlice";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [validationError, setValidationError] = useState("");

  const dispatch = useDispatch();
  const { isloading, error, successMessage } = useSelector(
    (state) => state.auth
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validationForm = () => {
    const { name, email, password, role } = formData;
    if (!name || !email || !password || !role) {
      return "All fileds are required.";
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return "Invalid email format.";
    }

    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validationForm();
    if (error) {
      setValidationError(error);
      return;
    }
    setValidationError("");
    dispatch(registerUser(formData));
  };

  return (
    <div>
      <h1>Signup Page</h1>
      {validationError && <p style={{ color: 'red' }}>{validationError}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="">Select Role</option>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
        </div>
        <button type="submit" disabled={isloading}>
          {isloading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Signup;
