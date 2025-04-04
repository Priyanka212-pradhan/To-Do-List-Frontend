import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // Clear token
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <h2 className="logo">My To-Do App</h2>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/taskform">Add Task</Link></li>
        <li><Link to="/tasklist">View List</Link></li>
        <li className="logout-text" onClick={handleLogout}>Logout</li>
      </ul>
    </nav>
  );
};

export default Navbar;

// Updated CSS for Navbar with Logout as Text
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
    cursor: pointer;
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

  .logout-text {
    color: white;
    font-size: 16px;
    font-weight: 500;
    padding: 0px;
    transition: all 0.3s ease-in-out;
    border-radius: 5px;
    display: flex;
    align-items: center; /* Aligns the text vertically */
  }

  .logout-text:hover {
    background: rgba(0, 0, 0, 0.2);
    
  }
`;

// Inject styles into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
