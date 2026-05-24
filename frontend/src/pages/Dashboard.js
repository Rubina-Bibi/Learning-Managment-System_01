// src/pages/Dashboard.js - COMPLETE STUDENT DASHBOARD
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    setUserName(localStorage.getItem('userName') || 'Student');
    setUserRole(localStorage.getItem('userRole') || 'student');
    
    // Load enrolled courses
    const saved = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    setEnrolledCourses(saved);
  }, [navigate]);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      paddingTop: '80px',
      paddingBottom: '40px'
    }}>
      
      {/* Welcome Header */}
      <div style={{textAlign: 'center', padding: '40px 20px'}}>
        <h1 style={{
          color: 'white',
          fontSize: '3.5rem',
          fontWeight: 'bold',
          marginBottom: '15px',
          textShadow: '2px 2px 10px rgba(0,0,0,0.3)'
        }}>
          🎓 Welcome Back, {userName}!
        </h1>
        <p style={{color: '#ddd', fontSize: '1.3rem'}}>
          <span style={{
            background: 'rgba(255,255,255,0.2)',
            padding: '8px 20px',
            borderRadius: '20px',
            fontWeight: 'bold',
            textTransform: 'uppercase'
          }}>
            {userRole}
          </span>
        </p>
      </div>

      {/* Stats Cards - 3 Columns */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '25px',
        padding: '0 40px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          background: 'white',
          padding: '35px',
          borderRadius: '20px',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
        }}>
          <div style={{fontSize: '3.5rem', marginBottom: '10px'}}>📚</div>
          <div style={{fontSize: '2.5rem', fontWeight: 'bold', color: '#667eea'}}>
            {enrolledCourses.length}
          </div>
          <div style={{color: '#666', fontSize: '1.1rem', marginTop: '5px'}}>
            Enrolled Courses
          </div>
        </div>
        
        <div style={{
          background: 'white',
          padding: '35px',
          borderRadius: '20px',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
        }}>
          <div style={{fontSize: '3.5rem', marginBottom: '10px'}}>✅</div>
          <div style={{fontSize: '2.5rem', fontWeight: 'bold', color: '#2ed573'}}>0</div>
          <div style={{color: '#666', fontSize: '1.1rem', marginTop: '5px'}}>
            Completed
          </div>
        </div>
        
        <div style={{
          background: 'white',
          padding: '35px',
          borderRadius: '20px',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
        }}>
          <div style={{fontSize: '3.5rem', marginBottom: '10px'}}>⏱️</div>
          <div style={{fontSize: '2.5rem', fontWeight: 'bold', color: '#ffa502'}}>0</div>
          <div style={{color: '#666', fontSize: '1.1rem', marginTop: '5px'}}>
            Hours Learned
          </div>
        </div>
      </div>

      {/* My Enrolled Courses Section */}
      <div style={{
        background: 'white',
        borderRadius: '25px',
        margin: '40px',
        padding: '40px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.15)'
      }}>
        {/* Section Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          paddingBottom: '20px',
          borderBottom: '2px solid #eee'
        }}>
          <h2 style={{fontSize: '2rem', fontWeight: 'bold', color: '#333'}}>
            📚 My Enrolled Courses
          </h2>
          <Link to="/courses" style={{
            background: '#667eea',
            color: 'white',
            padding: '12px 25px',
            borderRadius: '10px',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}>
            Browse More →
          </Link>
        </div>

        {/* Courses Grid or Empty State */}
        {enrolledCourses.length === 0 ? (
          <div style={{textAlign: 'center', padding: '60px 20px'}}>
            <div style={{fontSize: '6rem', marginBottom: '20px'}}>📖</div>
            <h3 style={{fontSize: '2rem', fontWeight: 'bold', color: '#666', marginBottom: '15px'}}>
              No Courses Yet
            </h3>
            <p style={{color: '#999', fontSize: '1.1rem', marginBottom: '30px'}}>
              Start your learning journey by enrolling in a course!
            </p>
            <Link to="/courses" style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              padding: '18px 40px',
              borderRadius: '15px',
              textDecoration: 'none',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              boxShadow: '0 10px 20px rgba(102, 126, 234, 0.4)'
            }}>
              🚀 Explore Courses
            </Link>
          </div>
        ) : (
          /* Enrolled Courses Grid - 3x3 */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '25px'
          }}>
            {enrolledCourses.map((course, index) => (
              <div key={index} style={{
                background: 'white',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                border: '1px solid #eee',
                transition: 'transform 0.3s'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                
                {/* Course Image with Different Colors */}
                <div style={{
                  height: '120px',
                  background: `linear-gradient(135deg, hsl(${index * 40}, 70%, 50%), hsl(${index * 40 + 30}, 80%, 60%))`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{fontSize: '4rem'}}>📺</span>
                </div>
                
                {/* Course Info */}
                <div style={{padding: '20px'}}>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    marginBottom: '10px',
                    color: '#333'
                  }}>
                    {course.title}
                  </h3>
                  <p style={{color: '#666', fontSize: '0.9rem', marginBottom: '10px'}}>
                    by {course.instructor || 'Instructor'}
                  </p>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '15px'
                  }}>
                    <span style={{
                      fontSize: '1.4rem',
                      fontWeight: 'bold',
                      color: '#2ed573'
                    }}>
                      ₹{course.price}
                    </span>
                    <button style={{
                      background: '#667eea',
                      color: 'white',
                      padding: '10px 20px',
                      borderRadius: '10px',
                      border: 'none',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}>
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;