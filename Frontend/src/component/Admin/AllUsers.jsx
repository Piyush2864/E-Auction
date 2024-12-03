import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/v1/auction/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch users.');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8000/api/v1/auction/admin/delete-user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((user) => user.id !== userId));
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>All Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map((user, index) => (
            <li key={user?.id || index}>
              {user?.name} - {user?.email} - {user?.role}
              <button onClick={() => handleDeleteUser(user?.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllUsers;
