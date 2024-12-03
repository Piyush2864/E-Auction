import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

const ProductBids = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const { productId } = useParams();

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const token = localStorage.getItem('token');
        // const productId = 'some-product-id'; 
        const response = await axios.get(`http://localhost:8000/api/v1/auction/admin/get-product-bids/${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        });
        setBids(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch product bids:', err);
        setLoading(false);
      }
    };

    fetchBids();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Product Bids</h2>
      {bids?.length === 0 ? <p>No bids found.</p> : <ul>{bids.map((bid) => <li key={bid.id}>{bid?.amount}</li>)}</ul>}
    </div>
  );
};

export default ProductBids;
