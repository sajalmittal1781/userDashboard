import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const AccountCreationTab = () => {
  const auth=useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // await axios.post('http://localhost:5000/api/users', { username, password ,email,phone });
      await axios.post('https://userdashboard-rgdf.onrender.com/api/users', { username, password ,email,phone });
      console.log('Account created successfully');
      setUsername('');
      setPassword('');
      setPhone('');
      setEmail('');
      auth.login();
    } catch (error) {
      console.error('Error creating account:', error);
    }

    
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-3xl font-semibold mb-6 text-center">Account Creation</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label >
          <input className="w-full px-3 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password:
          </label>
          <input className="w-full px-3 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username:
          </label>
          <input className="w-full px-3 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>


        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2"
          >
            Phone:
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

            type="tel"
            value={phone}
            pattern="[0-9]{10}"
            onChange={(e) => setPhone(e.target.value)}
            required
          />

        </div>



        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Create Account</button>
      </form>
    </div>
  );
};

export default AccountCreationTab;
