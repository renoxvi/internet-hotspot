// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [paymentCode, setPaymentCode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {

      const axiosInstance = axios.create({
        baseURL: 'http://localhost:5000', // Adjust the URL as needed
      });
      
      // ...
      
      const response = await axiosInstance.post('/api/registration', {
        email,
        password,
        paymentCode,
      });
      
      /*const response = await axios.post('/api/registration', {
        email,
        password,
        paymentCode,
      });*/

      console.log(response.data); // Handle the response data accordingly, e.g., show a success message or error message to the user.
    } catch (error) {
      console.error('Error occurred during registration:', error);
      res.status(500).json({ error: 'An error occurred during registration.' });
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="w-full max-w-md px-6 py-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paymentCode">
              Payment Code:
            </label>
            <input
              type="text"
              id="paymentCode"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:shadow-outline"
              value={paymentCode}
              onChange={(e) => setPaymentCode(e.target.value)}
              required
            />
          </div>

          {/* Add any payment options here, e.g., a dropdown for different payment plans */}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
