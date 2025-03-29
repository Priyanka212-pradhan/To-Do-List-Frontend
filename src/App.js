import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from './components/Registration';  // Assuming you have the Registration component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<Registration />} />
          {/* You can add other routes here if you need */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
