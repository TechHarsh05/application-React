import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Login from './component/Login';
import SignUp from './component/SignUp';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePage';
import User from './pages/User';
import './App.css';

const NavBar = ({ isLoggedIn, handleLogout }) => {
      const [user, setUserData] = useState("");

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

  // console.log(userData);
  
            
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
      
      <Link to="/dashboard/user">{
        <img
          src={user.userImage}
          alt="User"
          style={{ width: 65, height: 65, borderRadius: "50%" }}
        />    
      }</Link>
        <Link to="/dashboard">Dashboard</Link>
        <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.href = '/login';
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <Router>
      <div>
        <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/dashboard/user' element={<User/>} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

