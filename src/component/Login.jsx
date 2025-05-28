import axios from 'axios';
import { useState } from 'react';
import style from './login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // State to manage loading indicator
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage(''); // Clear previous error message
    setLoading(true); // Set loading to true while processing

    try {
      // Send request to login API
      const response = await axios.post('http://localhost:8383/auth/login', {
        email,
        password,
      });

      const { jwtToken, username } = response.data;

      // Store token and user information
      localStorage.setItem('token', jwtToken);
      localStorage.setItem('user', JSON.stringify({ username }));

      alert('Login Successful!');
      window.location.href = '/dashboard'; // Redirect user after login

    } catch (error) {
      // Handle errors gracefully
      console.error("Login Error:", error);
      const errorResponse = error.response?.data?.error || 'Login failed. Please try again.';
      setErrorMessage(errorResponse);
    } finally {
      setLoading(false); // Stop the loading spinner
    }
  };

  return (
    <div className={style.loginContainer}>
      <form onSubmit={handleSubmit} className={style.loginForm}>
        <h2>Login</h2>

        {errorMessage && <div className={style.error}>{errorMessage}</div>}

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
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
