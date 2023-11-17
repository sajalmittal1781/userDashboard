import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';

// const Modal = ({ isOpen, onClose, user }) => {
//   return (
//     <div className={`fixed inset-0 z-10 ${isOpen ? 'block' : 'hidden'}`}>
//       <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
//       <div className="absolute inset-0 flex items-center justify-center">
//         <div className="bg-white p-4 rounded-md">
//           <p className="mb-4">Report For Selected User</p>
//           <h1>{user.email}</h1>
//           <button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={onClose}>
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

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

  // console.log(users)

  // Empty dependency array ensures useEffect runs once on component mount

  // Filter users based on search term

  // const filteredUsers = users.filter(user =>
  //   user.username.toLowerCase().includes(searchTerm.toLowerCase())
  // );

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

  // const handleConfirmGenerateReport = async () => {
  //   try {
  //     // Send a request to the backend to generate a report
  //     const response = await axios.post('http://localhost:5000/api/generate-report', {
  //       userId: selectedUser.id,
  //     });

  //     // For simplicity, let's just log the report to the console
  //     console.log('Report generated:', response.data.report);
  //   } catch (error) {
  //     console.error('Error generating report:', error);
  //   }

  //   // Close the modal after generating the report
  //   // setIsModalOpen(false);
  // };

  return (<>
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-3xl font-semibold mb-4">User Details</h2>
      {/* <input
        className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Search by username"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      /> */}
       <input
        className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Search by username, email, or phone number"
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

      <Modal  user={selectedUser} isOpen={isModalOpen} onClose={handleCloseModal}  />

    </div>

    </>
  );

  // Function to handle generating a report for the selected user

  
};

export default UserDetailsTab;
