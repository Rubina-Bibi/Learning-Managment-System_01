// src/components/AdminDashboard.js
import React, { useState } from 'react';

const AdminDashboard = () => {
  const [instructors, setInstructors] = useState(() => {
    return JSON.parse(localStorage.getItem('lms_instructors') || '[]');
  });
  const [newInst, setNewInst] = useState({ name: '', email: '' });

  const addInstructor = () => {
    if (newInst.name && newInst.email) {
      const instructors = JSON.parse(localStorage.getItem('lms_instructors') || '[]');
      instructors.push({ id: Date.now(), name: newInst.name, email: newInst.email, active: true });
      localStorage.setItem('lms_instructors', JSON.stringify(instructors));
      setInstructors(instructors);
      setNewInst({ name: '', email: '' });
      alert(' Instructor Added!');
    }
  };

  const removeInstructor = (id) => {
    if (window.confirm('Remove this instructor?')) {
      const instructors = JSON.parse(localStorage.getItem('lms_instructors') || '[]').filter(i => i.id !== id);
      localStorage.setItem('lms_instructors', JSON.stringify(instructors));
      setInstructors(instructors);
    }
  };

  return (
    <div style={{paddingTop: '80px', minHeight: '100vh', background: 'linear-gradient(135deg, #ff9966, #ff5e62)'}}>
      <div style={{textAlign: 'center', padding: '40px'}}>
        <h1 style={{color: 'white', fontSize: '3rem'}}> Admin Panel</h1>
      </div>
      
      <div style={{background: 'white', borderRadius: '20px', margin: '0 40px 40px', padding: '30px'}}>
        <h2>➕ Add New Instructor</h2>
        <div style={{display: 'flex', gap: '10px', marginBottom: '30px'}}>
          <input placeholder="Name" value={newInst.name} onChange={(e) => setNewInst({...newInst, name: e.target.value})}
            style={{padding: '15px', flex: 1, border: '2px solid #ddd', borderRadius: '10px'}} />
          <input placeholder="Email" value={newInst.email} onChange={(e) => setNewInst({...newInst, email: e.target.value})}
            style={{padding: '15px', flex: 1, border: '2px solid #ddd', borderRadius: '10px'}} />
          <button onClick={addInstructor} style={{background: '#2ed573', color: 'white', padding: '15px 30px', border: 'none', borderRadius: '10px'}}>Add</button>
        </div>
        
        <h2>👥 All Instructors ({instructors.length})</h2>
        <table style={{width: '100%', borderCollapse: 'collapse'}}>
          <thead><tr style={{background: '#f5f5f5'}}><th style={{padding: '15px', textAlign: 'left'}}>Name</th><th style={{padding: '15px', textAlign: 'left'}}>Email</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {instructors.map(inst => (
              <tr key={inst.id} style={{borderBottom: '1px solid #eee'}}>
                <td style={{padding: '15px'}}>{inst.name}</td>
                <td style={{padding: '15px'}}>{inst.email}</td>
                <td><span style={{background: inst.active ? '#2ed573' : '#ccc', color: 'white', padding: '5px 10px', borderRadius: '5px'}}>{inst.active ? 'Active' : 'Inactive'}</span></td>
                <td><button onClick={() => removeInstructor(inst.id)} style={{background: 'red', color: 'white', padding: '8px 15px', border: 'none', borderRadius: '5px'}}>Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;