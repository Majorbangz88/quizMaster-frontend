import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './components/Auth/login/Login';
import Register from './components/Auth/register/Register';
import Quiz from './components/Quiz/Quiz';

function App() {
  return (
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/quiz" element={<Quiz />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
