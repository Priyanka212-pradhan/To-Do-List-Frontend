import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import navigate from react-router-dom

const TaskForm = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const token = localStorage.getItem('accessToken');  // Get the JWT token from localStorage
  const navigate = useNavigate();  // Initialize navigate to handle page redirection

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      title: taskTitle,
      description: taskDescription,
      due_date: dueDate || null,
      completed: completed,
    };

    try {
      // Send the task data along with the JWT token in the header for authentication
      const response = await axios.post('http://127.0.0.1:8000/tasks/', newTask, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Add JWT token in the header
        },
      });

      if (response.status === 201) {
        setTaskTitle('');
        setTaskDescription('');
        setDueDate('');
        setCompleted(false);
        setSuccessMessage('Task added successfully!');
        setError('');

        // Redirect to the Task List page after successful task creation
        setTimeout(() => {
          navigate('/tasklist');  // Navigate to TaskList page
        }, 1000);  // Small delay before navigation to display success message
      }
    } catch (err) {
      console.error('Error Adding Task:', err.response ? err.response.data : err.message);
      setError('Failed to add task. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2>Create New Task</h2>
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="input-label">Task Title:</label>
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            required
            className="input-field"
          />
        </div>

        <div className="input-group">
          <label className="input-label">Task Description:</label>
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            required
            className="input-field"
          />
        </div>

        <div className="input-group">
          <label className="input-label">Due Date:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="input-group">
          <label className="input-label">Completed:</label>
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="input-checkbox"
          />
        </div>

        <button type="submit" className="submit-button">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;

// CSS styles included in the same page
const styles = `
  .form-container {
    max-width: 500px;
    margin: 30px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }

  .input-group {
    margin-bottom: 15px;
  }

  .input-label {
    display: block;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 8px;
    color: #333;
  }

  .input-field {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border-radius: 4px;
    border: 1px solid #ddd;
    box-sizing: border-box;
    background-color: #f9f9f9;
  }

  .input-checkbox {
    margin-left: 10px;
  }

  button {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    color: #fff;
    background-color: #4CAF50;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #45a049;
  }

  .error-message, .success-message {
    text-align: center;
    font-size: 14px;
    margin-bottom: 15px;
  }

  .error-message {
    color: red;
  }

  .success-message {
    color: green;
  }
`;

// Inject the CSS into the page
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
