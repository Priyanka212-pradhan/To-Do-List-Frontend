import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  // Logout function
  // const handleLogout = () => {
  //   localStorage.removeItem("accessToken"); // Clear token
  //   navigate("/login"); // Redirect to login page
  // };

  return (
    <nav className="navbar">
      <h2 className="logo">My To-Do App</h2>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/add-task">Add Task</Link></li>
        <li><Link to="/task-list">Task List</Link></li>
        {/*<li><button className="logout-button" onClick={handleLogout}>Logout</button></li>*/}
      </ul>
    </nav>
  );
};

export default Navbar;

// Improved CSS for Navbar
const styles = `
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(135deg, #006400, #32CD32);
    padding: 15px 30px;
    color: white;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }

  .logo {
    font-size: 22px;
    font-weight: bold;
    letter-spacing: 1px;
  }

  .nav-links {
    list-style: none;
    display: flex;
    gap: 20px;
  }

  .nav-links li {
    display: inline;
  }

  .nav-links li a {
    color: white;
    text-decoration: none;
    font-size: 16px;
    font-weight: 500;
    padding: 8px 12px;
    transition: all 0.3s ease-in-out;
    border-radius: 5px;
  }

  .nav-links li a:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  .logout-button {
    background: #ff4b5c;
    color: white;
    border: none;
    padding: 8px 14px;
    cursor: pointer;
    border-radius: 6px;
    font-weight: bold;
    transition: all 0.3s ease-in-out;
  }

  .logout-button:hover {
    background: #e53e3e;
    transform: scale(1.05);
  }
`;

// Inject styles into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
