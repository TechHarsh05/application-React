// src/components/NavBar.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteUser from '../component/DeleteUser';
import './navbar.module.css';

const Navbar = ({ isLoggedIn, handleLogout }) => {
  const [user, setUserData] = useState("");
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("user"));
    const userData = userDetails?.user;
    if (userData) {
      setUserData({
        ...userData,
        userImage: `data:image/jpeg;base64,${userData.userImage}`
      });
    }
  }, []);

  const handleDeleteUser = () => {
    alert("Delete User Clicked: " + user.id);
    setShowDelete(true);
  };

  const handleUpdateUser = () => {
    window.location.href = 'dashboard/update';
  };

  return (
    <nav>
      {!isLoggedIn ? (
        <>
          <div>
            <Link to="/">Home</Link>
          </div>
          <div>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
          </div>
        </>
      ) : (
        <>
          <div className="profile-container">
            <img
              src={user.userImage}
              alt="User"
              className="profile-pic"
            />
            <div className="profile-options">
              <div>
                <button onClick={handleUpdateUser}>Update User</button>
                <button onClick={handleDeleteUser}>Delete User</button>
                {showDelete && <DeleteUser id={user.id} />}
              </div>
            </div>
          </div>
          <Link to="/dashboard">Dashboard</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
