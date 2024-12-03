import React, { useState } from 'react';
import axios from 'axios';

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddCategory = async (e) => {
    e.preventDefault();

   
    setSuccessMessage('');
    setErrorMessage('');


    if (!categoryName.trim() || !categoryDescription.trim()) {
      setErrorMessage('All fields are required.');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      if (!token) {
        setErrorMessage('Unauthorized. Please log in to add a category.');
        setLoading(false);
        return;
      }

      const response = await axios.post(
        'http://localhost:8000/api/v1/auction/category/add-category',
        {
          name: categoryName,
          description: categoryDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setSuccessMessage('Category added successfully!');
        setCategoryName('');
        setCategoryDescription('');
      } else {
        setErrorMessage('Failed to add category.');
      }
    } catch (error) {
      console.error('Error adding category:', error);
      setErrorMessage('An error occurred while adding the category.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-category-page">
      <h1>Add Category</h1>
      <form onSubmit={handleAddCategory} className="add-category-form">
        <div className="form-group">
          <label htmlFor="categoryName">Category Name</label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="categoryDescription">Category Description</label>
          <textarea
            id="categoryDescription"
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
            placeholder="Enter category description"
            rows="4"
            required
          ></textarea>
        </div>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Adding...' : 'Add Category'}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
