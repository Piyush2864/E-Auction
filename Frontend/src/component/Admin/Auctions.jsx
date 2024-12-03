import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Auctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/v1/auction/admin/auctions', {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        });
        setAuctions(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch auctions:', err);
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>All Auctions</h2>
      {auctions?.length === 0 ? <p>No auctions found.</p> : <ul>{auctions?.map((auction, index) => <li key={auction?.id || index}>{auction?.name}</li>)}</ul>}
    </div>
  );
};

export default Auctions;
