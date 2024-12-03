import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await axios.get('http://localhost:8000/api/v1/auction/admin/products', {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        });
        setProducts(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleApprove = async (productId) => {
    try {
        const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:8000/api/v1/auction/admin/approve-product/${productId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
          },
      });
      setProducts(products.filter((product) => product.id !== productId));
    } catch (err) {
      console.error('Error approving product:', err);
    }
  };

  const handleReject = async (productId) => {
    try {
        const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:8000/api/v1/auction/admin/reject-product/${productId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
          },
      });
      setProducts(products.filter((product) => product.id !== productId));
    } catch (err) {
      console.error('Error rejecting product:', err);
    }
  };

  const handleDelete = async (productId) => {
    try {
        const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8000/api/v1/auction/admin/delete-product/${productId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
          },
      });
      setProducts(products.filter((product) => product.id !== productId));
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>All Products</h2>
      {products?.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul>
          {products?.map((product, index) => (
            <li key={product?.id || index}>
              {product?.name} - {product?.description} - {product?.currentBid}
              <button onClick={() => handleApprove(product?.id)}>Approve</button>
              <button onClick={() => handleReject(product?.id)}>Reject</button>
              <button onClick={() => handleDelete(product?.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllProducts;
