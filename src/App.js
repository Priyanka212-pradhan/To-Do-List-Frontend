import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Registration from './components/Registration';  // Correct path
import Login from './components/Login';  // Correct path
import TaskForm from './components/TaskForm';  // Correct path for TaskForm
import TaskList from './components/TaskList';


function App() {
  return (
    <Router>
       <Navbar />  {/* Navbar will appear on all pages */}
      <div className="App">
        <Routes>
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/taskform" element={<TaskForm />} />  {/* Added TaskForm Route */}
          <Route path="/tasklist" element={<TaskList />} />  {/* Added TaskForm Route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
