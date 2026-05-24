// src/components/CourseCard.js - ENROLL BUTTON WITH SAVE
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleEnroll = () => {
    //  Check login first
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    //  Save to enrolled courses in localStorage
    const savedCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    
    // Check if already enrolled
    const alreadyEnrolled = savedCourses.find(c => c.id === course.id);
    if (!alreadyEnrolled) {
      savedCourses.push({
        id: course.id,
        title: course.title,
        price: course.price,
        instructor: course.instructor,
        description: course.description
      });
      localStorage.setItem('enrolledCourses', JSON.stringify(savedCourses));
      alert(' Successfully Enrolled!');
    } else {
      alert('You are already enrolled in this course!');
    }
  };

  return (
    <div style={{background: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)'}}>
      <div style={{height: '140px', background: `linear-gradient(135deg, hsl(${course.id * 40}, 70%, 50%), hsl(${course.id * 40 + 30}, 80%, 60%))`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <span style={{fontSize: '4rem'}}>📚</span>
      </div>
      <div style={{padding: '20px'}}>
        <h3 style={{fontWeight: 'bold', marginBottom: '8px'}}>{course.title}</h3>
        <p style={{color: '#666', fontSize: '0.9rem', marginBottom: '10px'}}>{course.instructor}</p>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <span style={{fontWeight: 'bold', color: '#2ed573'}}>₹{course.price}</span>
          <button onClick={handleEnroll} style={{background: '#667eea', color: 'white', padding: '10px 20px', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer'}}>
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;