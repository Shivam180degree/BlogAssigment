import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCreationForm from './UserCreationForm';
import { Link } from 'react-router-dom';

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchUserList = async () => {
    try {
      const response = await axios.get('https://gorest.co.in/public/v1/users');
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching user list:', error);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="container">
    <div className="cardsContainer">
      <h1>User List</h1>
      <button onClick={handleOpenModal}>Create User</button>
      <UserCreationForm isOpen={modalOpen} toggleModal={handleCloseModal} />
      <div className="row">
      {users.map((user) => (
          <div className="col-md-4" key={user.id}>
            <div className="card user-card">
              <img
                src="https://dummyimage.com/200x200"
                alt="User Avatar"
                className="card-img-top user-avatar"
              />
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <div className="user-details">
                  <p>
                    <strong>ID:</strong> {user.id}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Gender:</strong> {user.gender}
                  </p>
                </div>
                <Link to="/posts" className="btn btn-primary">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default UserListPage;
