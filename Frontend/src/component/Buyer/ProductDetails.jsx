import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');

        if (!token) {
          setError('Unauthorized. Please log in to view product details.');
          setLoading(false);
          return;
        }

        // Send the GET request with the Authorization header
        const response = await axios.get(
          `http://localhost:8000/api/v1/auction/product/get-product/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProduct(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error:', err);
        setError('Error fetching product details.');
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>{error}</div>; // Error state
  }

  return (
    <div>
      {product && (
        <div>
          <h1>{product?.name}</h1>
          <div>
            <strong>Description:</strong>
            <p>{product?.description}</p>
          </div>

          <div>
            <strong>Seller:</strong>
            <p>{product?.seller?.name || 'Unknown Seller'}</p>
          </div>

          <div>
            <strong>Category:</strong>
            <p>{product?.category?.name || 'Uncategorized'}</p>
          </div>

          <div>
            <strong>Starting Date:</strong>
            <p>{new Date(product?.startingDate).toLocaleDateString()}</p>
          </div>

          <div>
            <strong>Current Bid:</strong>
            <p>${product?.currentBid}</p>
          </div>

          <div>
            <strong>Bid End Date:</strong>
            <p>{new Date(product.bidEndDate).toLocaleDateString()}</p>
          </div>

          {product?.images?.length > 0 && (
            <div>
              <strong>Images:</strong>
              <div>
                {product?.images?.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Product Image ${index + 1}`}
                    style={{ maxWidth: '200px', margin: '10px' }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
