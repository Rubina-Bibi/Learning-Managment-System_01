import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import CourseList from './pages/CourseList.js';
import Dashboard from './pages/Dashboard.js';
import AdminDashboard from './components/AdminDashboard.js';
import InstructorDashboard from './components/InstructorDashboard.js';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('token'));
  const [userRole, setUserRole] = useState(() => localStorage.getItem('userRole'));

  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUserRole(null);
  };

  // Expose logout to Navbar
  window.logout = logout;

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<CourseList />} />
        <Route path="/courses" element={<CourseList />} />
        
        {!isAuthenticated ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/dashboard" element={
              userRole === 'admin' ? <Navigate to="/dashboard/admin" /> :
              userRole === 'instructor' ? <Navigate to="/dashboard/instructor" /> :
              <Dashboard />
            } />
            <Route path="/dashboard/admin" element={userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} />
            <Route path="/dashboard/instructor" element={userRole === 'instructor' ? <InstructorDashboard /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
