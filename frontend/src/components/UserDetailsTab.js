import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';

const UserDetailsTab = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.creationDate.toLowerCase().includes(searchTerm.toLowerCase())

  );


  const handleGenerateReport = (userId) => {
    const user = users.find(user => user._id === userId);
    if (user) {
      setSelectedUser(user);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (<>
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-3xl font-semibold mb-4">User Details</h2>

      <input
        className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Search by username, email, id, creation date or phone number"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">Username</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Phone</th>
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Creation Date</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border">{user.username}</td>
              <td className="py-2 px-4 border">{user.email}</td>
              <td className="py-2 px-4 border">{user.phone}</td>
              <td className="py-2 px-4 border">{user._id}</td>
              <td className="py-2 px-4 border">{user.creationDate}</td>
              <td className="py-2 px-4 border">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => handleGenerateReport(user._id)}
                >
                  Generate Report
                </button>
              </td>
            </tr>


          ))}
        </tbody>
      </table>

      <Modal user={selectedUser} isOpen={isModalOpen} onClose={handleCloseModal} />

    </div>

  </>
  );
};

export default UserDetailsTab;
