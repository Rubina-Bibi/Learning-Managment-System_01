import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    //  DEMO USERS - Working credentials
    const users = {
      'admin@lmspro.com': { password: '123', role: 'admin', name: 'Admin' },
      'instructor@lmspro.com': { password: '123', role: 'instructor', name: 'Instructor' },
      'student@lmspro.com': { password: '123', role: 'student', name: 'Student' },
      'admin@learnify.com': { password: 'admin123', role: 'admin', name: 'Admin User' }
    };

    const user = users[email];
    if (user && user.password === password) {
      localStorage.setItem('token', 'demo-token');
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('userName', user.name);
      localStorage.setItem('userEmail', email);
      navigate('/dashboard');
    } else {
      alert('Invalid! Use:\nadmin@lmspro.com / 123\nstudent@lmspro.com / 123');
    }
  };

  return (
    <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #667eea, #764ba2)', padding: '20px'}}>
      <div style={{maxWidth: '450px', width: '100%', background: 'white', padding: '50px', borderRadius: '25px'}}>
        <h1 style={{textAlign: 'center', fontSize: '2.5rem', marginBottom: '30px'}}>Login</h1>
        <form onSubmit={handleLogin} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required
            style={{padding: '15px', border: '2px solid #ddd', borderRadius: '10px', fontSize: '16px'}} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required
            style={{padding: '15px', border: '2px solid #ddd', borderRadius: '10px', fontSize: '16px'}} />
          <button type="submit" style={{padding: '18px', background: '#667eea', color: 'white', border: 'none', borderRadius: '12px', fontSize: '18px', fontWeight: 'bold'}}>
            🚀 Sign In
          </button>
        </form>
        <div style={{marginTop: '30px', padding: '20px', background: '#f5f5f5', borderRadius: '12px'}}>
          <p style={{fontWeight: 'bold', marginBottom: '10px'}}>🧪 Demo:</p>
          <p>admin@lmspro.com / 123</p>
          <p>student@lmspro.com / 123</p>
          <p>instructor@lmspro.com / 123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;