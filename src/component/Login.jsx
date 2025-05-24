import axios from 'axios';
import { useState } from 'react';
import style from './login.module.css';

const Login = () => {
  const API = 'http://localhost:8383/loggin';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(API, { email, password }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const resp = response.data;

      if (resp.ok && resp.token) {
        console.log('JWT Token:', resp.token);
        alert('Login Successful');

        localStorage.setItem('token', resp.token);
        localStorage.setItem('user', JSON.stringify(resp.user));

        // Redirect if needed
        // window.location.href = '/home';
      } else {
        alert('Invalid Credentials');
      }
    } catch (error) {
      console.log('Error:', error);
      alert('Login failed');
    }
  };

  return (
    <div className={style.loginContainer}>
      <form onSubmit={handleSubmit} className={style.loginForm}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
