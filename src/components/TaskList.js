import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('accessToken');  // Get the JWT token from localStorage

  // Fetch tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/tasks/', {
          headers: {
            'Authorization': `Bearer ${token}`,  // Add JWT token in the header
          },
        });
        setTasks(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching tasks.');
        setLoading(false);
      }
    };

    fetchTasks();
  }, [token]);

  // // Handle delete task
  // const handleDelete = async (taskId) => {
  //   try {
  //     await axios.delete(`http://127.0.0.1:8000/tasks/${taskId}/`, {
  //       headers: {
  //         'Authorization': `Bearer ${token}`,  // Add JWT token in the header
  //       },
  //     });
  //     setTasks(tasks.filter((task) => task.id !== taskId));  // Remove task from the state
  //   } catch (err) {
  //     setError('Failed to delete task.');
  //   }
  // };

  // Handle mark task as completed
  const handleComplete = async (taskId) => {
    try {
      const updatedTask = tasks.find((task) => task.id === taskId);
      updatedTask.completed = !updatedTask.completed;

      await axios.put(`http://127.0.0.1:8000/tasks/${taskId}/`, updatedTask, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      setTasks([...tasks]);  // Update the task list after completion status change
    } catch (err) {
      setError('Failed to update task status.');
    }
  };

  return (
    <div className="task-list-container">
      <h2>Your Tasks</h2>
      {loading && <p>Loading tasks...</p>}
      {error && <div className="error-message">{error}</div>}

      <table className="task-table">
        <thead>
          <tr>
            <th>Task Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.due_date}</td>
                <td>
                  <button
                    onClick={() => handleComplete(task.id)}
                    className={task.completed ? 'completed' : 'not-completed'}
                  >
                    {task.completed ? 'Completed' : 'Mark as Complete'}
                  </button>
                </td>
                {/*<td>*/}
                {/*  <button onClick={() => handleDelete(task.id)} className="delete-button">*/}
                {/*    Delete*/}
                {/*  </button>*/}
                {/*</td>*/}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No tasks available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;

// CSS included in the same file for styling
const styles = `
  .task-list-container {
    max-width: 800px;
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

  .task-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }

  .task-table th, .task-table td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  .task-table th {
    background-color: #f4f4f4;
  }

  .task-table tr:hover {
    background-color: #f9f9f9;
  }

  .completed {
    background-color: #4CAF50;
    color: white;
  }

  .not-completed {
    background-color: #FF9800;
    color: white;
  }

  .delete-button {
    background-color: #FF6347;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .delete-button:hover {
    background-color: #e53e3e;
  }

  .error-message {
    color: red;
    font-size: 16px;
    text-align: center;
  }
`;

// Inject the CSS into the page
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
