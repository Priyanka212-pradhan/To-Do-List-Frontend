import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './components/Registration';  // Correct path
import Login from './components/Login';  // Correct path

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          {/* You can also add a route for the dashboard or home page here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
