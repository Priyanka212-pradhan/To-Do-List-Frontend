import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom

const Registration = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare data to be sent to the Django backend
        const userData = {
            username,
            email,
            password,
        };

        try {
            // Make POST request to Django registration API endpoint
            const response = await axios.post('http://127.0.0.1:8000/register/', userData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 201) {
                setSuccessMessage('Registration successful!');
                setUsername('');
                setEmail('');
                setPassword('');
                setError('');
            }
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Create an Account</h2>

            {error && <div style={styles.error}>{error}</div>}
            {successMessage && <div style={styles.success}>{successMessage}</div>}

            <form style={styles.form} onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>

                <button type="submit" style={styles.submitButton}>Register</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '50px',
        fontFamily: 'Arial, sans-serif',
    },
    header: {
        marginBottom: '20px',
        color: '#333',
        fontSize: '24px',
    },
    error: {
        color: 'red',
        marginBottom: '10px',
    },
    success: {
        color: 'green',
        marginBottom: '10px',
    },
    form: {
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f9f9f9',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    formGroup: {
        marginBottom: '15px',
    },
    label: {
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#555',
        marginBottom: '5px',
    },
    input: {
        padding: '10px',
        fontSize: '14px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '100%',
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        color: '#fff',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
};

export default Registration;
