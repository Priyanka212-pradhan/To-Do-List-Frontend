import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // To navigate after successful login

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data to be sent to the Django backend
    const userData = {
      username,
      password,
    };

    try {
      // Make POST request to Django login API endpoint
      const response = await axios.post('https://to-do-list-backend-git-main-priyankas-projects-7974bcbc.vercel.app/login/', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

       // Check if token is present in response
    if (response.data.access && response.data.refresh) {
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);

      setSuccessMessage('Login successful!');
        setError('');

        // Redirect to TaskForm page after successful login
        setTimeout(() => {
          navigate('/taskform');  // Redirecting to task form page
        }, 1000);

    } else {
      console.error('No token received in response:', response.data);
    }
  } catch (error) {
    console.error('Login Error:', error.response ? error.response.data : error.message);
  }
    //   if (response.status === 200) {
    //     // Assuming the response contains a token
    //     const token = response.data.token; // Token from Django backend
    //     localStorage.setItem('authToken', token); // Store JWT token in localStorage
    //
    //     setSuccessMessage('Login successful!');
    //     setError('');
    //
    //     // Redirect to TaskForm page after successful login
    //     setTimeout(() => {
    //       navigate('/taskform');  // Redirecting to task form page
    //     }, 1000);
    //   }
    // } catch (err) {
    //   setError('Login failed. Please check your credentials and try again.');
    // }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Login</h2>

        {error && <div style={styles.errorMessage}>{error}</div>}
        {successMessage && <div style={styles.successMessage}>{successMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label htmlFor="username" style={styles.label}>Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button}>Login</button>
        </form>

        <p style={styles.signupLink}>
          Don't have an account? <a href="/register" style={styles.link}>Register here</a>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f4f9',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '300px',
    textAlign: 'center',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  inputGroup: {
    marginBottom: '15px',
    textAlign: 'left',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    color: '#333',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#45a049',
  },
  errorMessage: {
    color: 'red',
    marginBottom: '15px',
    fontSize: '14px',
  },
  successMessage: {
    color: 'green',
    marginBottom: '15px',
    fontSize: '14px',
  },
  signupLink: {
    fontSize: '14px',
    marginTop: '15px',
    color: '#333',
  },
  link: {
    color: '#4CAF50',
    textDecoration: 'none',
  },
};

export default Login;
