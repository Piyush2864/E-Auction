import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        // Retrieve token from localStorage
        const token = localStorage.getItem('token'); 

        if (!token) {
          setError('User is not authenticated. Please log in.');
          setLoading(false);
          return;
        }

        // Send request with Authorization header
        const response = await axios.get(
          'http://localhost:8000/api/v1/auction/product/get-all-product',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data);

        if (response.data.success) {
          setProducts(response.data.data);
        } else {
          setError('Failed to fetch products.');
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Error fetching products.');
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []); // Empty array ensures this runs only once on component mount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="product-list">
      <h1>All Products</h1>

      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p><strong>Current Bid:</strong> ${product.currentBid}</p>
              <p><strong>Category:</strong> {product.category?.name || 'Uncategorized'}</p>

              {product.images.length > 0 && (
                <div className="product-images">
                  <img
                    src={product.images[0]} 
                    alt={`Image of ${product.name}`}
                    className="product-image"
                  />
                </div>
              )}

              <Link to={`/product-details/${product._id}`} className="view-details-btn">
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductListPage;
