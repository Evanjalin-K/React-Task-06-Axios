import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import "../css/UserData.css";

const UserData = ({ users, handleDeleteUser, onAddUser, onUpdateUser }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [editingUserId, setEditingUserId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    if (editingUserId) {
      const userToEdit = users.find(user => user.id === editingUserId);
      if (userToEdit) {
        setName(userToEdit.name);
        setUsername(userToEdit.username);
        setEmail(userToEdit.email);
        setAddress(userToEdit.address.city);
        setPhone(userToEdit.phone);
        setCompany(userToEdit.company.name);
      }
    }
  }, [editingUserId, users]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUserId) {
        const updatedUser = {
          id: editingUserId,
          name,
          username,
          email,
          address: {
            city: address
          },
          phone,
          company: {
            name: company
          }
        };
        await axios.put(`https://jsonplaceholder.typicode.com/users/${editingUserId}`, updatedUser);
        onUpdateUser(updatedUser);
      } else {
        const response = await axios.post('https://jsonplaceholder.typicode.com/users/', {
          name,
          username,
          email,
          address: {
            city: address
          },
          phone,
          company: {
            name: company
          }
        });
        onAddUser(response.data);
      }
      clearFields();
    } catch (error) {
      console.error('Failed to add/update user:', error);
    }
  };

  const handleEditUser = (userId) => {
    setEditingUserId(userId);
    setShowAddForm(true); // Show form when editing
  };

  const handleAddUser = () => {
    setShowAddForm(true); // Show form when adding
  };

  const clearFields = () => {
    setName('');
    setUsername('');
    setEmail('');
    setAddress('');
    setPhone('');
    setCompany('');
    setEditingUserId(null);
    setShowAddForm(false); // Hide form after submission or cancellation
  };

  return (
    <div className='container'>
      {!showAddForm && (
        <button className="addButton" onClick={handleAddUser}>
          <FontAwesomeIcon icon={faPlus} /> Add User
        </button>
      )}

      {showAddForm && (
        <div className="addUserForm">
          <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='inputField' placeholder="Name" required />
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className='inputField' placeholder="Username" required />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='inputField' placeholder="Email" required />
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className='inputField' placeholder="Address" required />
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}  className='inputField' placeholder="Phone" required />
            <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} className='inputField' placeholder="Company" required />
            <button type="submit">
              <FontAwesomeIcon icon={editingUserId ? faEdit : faPlus} /> {editingUserId ? 'Update' : 'Add'}
            </button>
          </form>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.address.city}</td>
              <td>{user.phone}</td>
              <td>{user.company.name}</td>
              <td>
                <button onClick={() => handleEditUser(user.id)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="delete-icon" onClick={() => handleDeleteUser(user.id)}>
                  <FontAwesomeIcon icon={faTrash} color="red" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserData;
