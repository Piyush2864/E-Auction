import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isloading, isAuthenticated, error} = useSelector((state)=> state.auth);


  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser({email, password})).then((response)=> {
      const {role} = response.data.payload;
      if(role === 'admin') navigate('/admin/AdminDashboard');
      else if(role === 'seller') navigate('/seller/SellerDshboard');
      else if(role === 'buyer') navigate('/buyer/BuyerDashboard');
    });
  };

  
  return (
    <div>
      <h2> Login </h2>
      {error && <p style={{color: 'red'}}> {error}</p>}
      <form onSubmit={handleSubmit}>
      <div>
        <label>Email</label>
        <input 
        type="text"
        value={email}
        onChange={(e)=> setEmail(e.target.value)}
        required
         />
      </div>
      <div>
        <label>Password</label>
        <input 
        type="text" 
        value={password}
        onChange={(e)=> setPassword(e.target.password)}
        />
      </div>
      <button type='submit' disabled={isloading}>
        {isloading ? 'Loading in...' : 'Login'}
      </button>
      </form>
    </div> 
  )
}

export default Login