// src/pages/Register.js - 
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('student');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    
    //  Auto login without password
    localStorage.setItem('token', 'demo-token');
    localStorage.setItem('userRole', role);
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    
    alert(' Account Created Successfully!');
    navigate('/dashboard');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '450px',
        width: '100%',
        background: 'white',
        padding: '50px',
        borderRadius: '25px',
        boxShadow: '0 25px 50px rgba(0,0,0,0.2)'
      }}>
        <h1 style={{textAlign: 'center', fontSize: '2.5rem', marginBottom: '30px', color: '#333'}}>
          Create Account
        </h1>
        
        <form onSubmit={handleRegister} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
          
          {/* Name - NO PASSWORD */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{padding: '15px', border: '2px solid #ddd', borderRadius: '10px', fontSize: '16px'}}
            required
          />
          
          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{padding: '15px', border: '2px solid #ddd', borderRadius: '10px', fontSize: '16px'}}
            required
          />
          
          {/* Role Choose */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{padding: '15px', border: '2px solid #ddd', borderRadius: '10px', fontSize: '16px'}}
          >
            <option value="student">🎓 Student</option>
            <option value="instructor">👨‍🏫 Instructor</option>
            <option value="admin">🛠️ Admin</option>
          </select>
          
          <button
            type="submit"
            style={{
              padding: '18px',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            🚀 Create Account
          </button>
        </form>

        <p style={{textAlign: 'center', marginTop: '20px'}}>
          Already have account? <Link to="/login" style={{color: '#667eea', fontWeight: 'bold'}}>Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;