import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingTask, setEditingTask] = useState(null);  // For storing the task to be edited
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedDueDate, setUpdatedDueDate] = useState('');
  const [updatedCompleted, setUpdatedCompleted] = useState(false);

  const token = localStorage.getItem('accessToken');  // Get the JWT token from localStorage

  // Fetch tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://to-do-list-backend-git-main-priyankas-projects-7974bcbc.vercel.app/tasks/', {
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

  // Handle delete task
  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`https://to-do-list-backend-git-main-priyankas-projects-7974bcbc.vercel.app/tasks/${taskId}/`, {
        headers: {
          'Authorization': `Bearer ${token}`,  // Add JWT token in the header
        },
      });
      setTasks(tasks.filter((task) => task.id !== taskId));  // Remove task from the state
    } catch (err) {
      setError('Failed to delete task.');
    }
  };

  // Handle mark task as completed or pending using dropdown
  const handleStatusChange = async (taskId, status) => {
    try {
      const updatedTask = tasks.find((task) => task.id === taskId);
      updatedTask.completed = status === 'Completed'; // Set the status based on dropdown value

      await axios.put(`https://to-do-list-backend-git-main-priyankas-projects-7974bcbc.vercel.app/tasks/${taskId}/`, updatedTask, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      setTasks([...tasks]);  // Update the task list after status change
    } catch (err) {
      setError('Failed to update task status.');
    }
  };

  // Handle edit task
  const handleEdit = (task) => {
    setEditingTask(task);
    setUpdatedTitle(task.title);
    setUpdatedDescription(task.description);
    setUpdatedDueDate(task.due_date);
    setUpdatedCompleted(task.completed);
  };

  // Handle saving the edited task
  const handleSaveEdit = async (taskId) => {
    const updatedTask = {
      title: updatedTitle,
      description: updatedDescription,
      due_date: updatedDueDate || null,
      completed: updatedCompleted,
    };

    try {
      await axios.put(`https://to-do-list-backend-git-main-priyankas-projects-7974bcbc.vercel.app/tasks/${taskId}/`, updatedTask, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // Update task in state after edit
      setTasks(tasks.map((task) => (task.id === taskId ? { ...task, ...updatedTask } : task)));
      setEditingTask(null);  // Close edit mode
      setError('');
    } catch (err) {
      setError('Failed to update task.');
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
                  <select
                    value={task.completed ? 'Completed' : 'Pending'}
                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                    className={task.completed ? 'completed-status' : 'pending-status'}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
                <td>
                  <div className="task-actions">
                    <button onClick={() => handleEdit(task)} className="edit-button">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(task.id)} className="delete-button">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No tasks available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editingTask && (
        <div className="edit-modal">
          <h3>Edit Task</h3>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
            />
          </div>
          <div>
            <label>Due Date:</label>
            <input
              type="date"
              value={updatedDueDate}
              onChange={(e) => setUpdatedDueDate(e.target.value)}
            />
          </div>
          <div>
            <label>Completed:</label>
            <input
              type="checkbox"
              checked={updatedCompleted}
              onChange={(e) => setUpdatedCompleted(e.target.checked)}
            />
          </div>
          <button onClick={() => handleSaveEdit(editingTask.id)} className="save-button">
            Save Changes
          </button>
          <button onClick={() => setEditingTask(null)} className="cancel-button">
            Cancel
          </button>
        </div>
      )}
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

  .task-actions {
    display: flex;
    gap: 10px;  /* Add space between buttons */
  }

  .delete-button, .edit-button {
    background-color: #FF6347;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .delete-button:hover, .edit-button:hover {
    background-color: #e53e3e;
  }

  .edit-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 400px;
    z-index: 1000;
  }

  .edit-modal input, .edit-modal textarea {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }

  .save-button, .cancel-button {
    padding: 10px 20px;
    margin-right: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .save-button {
    background-color: #4CAF50;
    color: white;
  }

  .cancel-button {
    background-color: #FF6347;
    color: white;
  }

  .save-button:hover {
    background-color: #45a049;
  }

  .cancel-button:hover {
    background-color: #e53e3e;
  }

  .error-message {
    color: red;
    font-size: 16px;
    text-align: center;
  }

  /* Styling for dropdown */
  select {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    background-color: #f8f8f8;
    transition: background-color 0.3s, border 0.3s;
  }

  select:focus {
    border: 1px solid #4CAF50;
    background-color: #fff;
  }

  .completed-status {
    background-color: #4CAF50;
    color: white;
  }

  .pending-status {
    background-color: #FF9800;
    color: white;
  }

  .completed-status:hover, .pending-status:hover {
    background-color: #45a049;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
