import React from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Login from './component/Login';
import SignUp from './component/SignUp';
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/" >Home</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Login</Link>
        </nav>
        
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App;
