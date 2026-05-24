// src/components/InstructorDashboard.js - INSTRUCTOR DASHBOARD
import React, { useState, useEffect } from 'react';

const InstructorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ title: '', description: '', price: '' });
  const [newLecture, setNewLecture] = useState({ title: '', url: '' });
  const [selectedCourse, setSelectedCourse] = useState('');

  useEffect(() => {
    // Get instructor's courses
    const instructor = localStorage.getItem('userEmail');
    const allCourses = JSON.parse(localStorage.getItem('lms_courses') || '[]');
    const myCourses = allCourses.filter(c => c.instructor === instructor || c.instructor === 'admin@lmspro.com');
    setCourses(myCourses);
  }, []);

  const addCourse = () => {
    if (newCourse.title && newCourse.price) {
      const allCourses = JSON.parse(localStorage.getItem('lms_courses') || '[]');
      const course = {
        id: Date.now(),
        title: newCourse.title,
        description: newCourse.description,
        price: parseInt(newCourse.price),
        instructor: localStorage.getItem('userEmail'),
        students: 0,
        lectures: []
      };
      allCourses.push(course);
      localStorage.setItem('lms_courses', JSON.stringify(allCourses));
      
      // Refresh courses
      const instructor = localStorage.getItem('userEmail');
      setCourses(allCourses.filter(c => c.instructor === instructor || c.instructor === 'admin@lmspro.com'));
      setNewCourse({ title: '', description: '', price: '' });
      alert(' Course Created!');
    }
  };

  const addLecture = () => {
    if (newLecture.title && newLecture.url && selectedCourse) {
      const allCourses = JSON.parse(localStorage.getItem('lms_courses') || '[]');
      const course = allCourses.find(c => c.id === parseInt(selectedCourse));
      
      if (course) {
        course.lectures = course.lectures || [];
        course.lectures.push({
          id: Date.now(),
          title: newLecture.title,
          url: newLecture.url
        });
        localStorage.setItem('lms_courses', JSON.stringify(allCourses));
        
        // Refresh
        const instructor = localStorage.getItem('userEmail');
        setCourses(allCourses.filter(c => c.instructor === instructor || c.instructor === 'admin@lmspro.com'));
        setNewLecture({ title: '', url: '' });
        alert(' Lecture Added!');
      }
    }
  };

  const revenue = courses.reduce((a, c) => a + (c.price * (c.students || 0)), 0);

  return (
    <div style={{
      paddingTop: '80px',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #11998e, #38ef7d)',
      paddingBottom: '40px'
    }}>
      
      {/* Header */}
      <div style={{textAlign: 'center', padding: '40px'}}>
        <h1 style={{color: 'white', fontSize: '3rem'}}>👨‍🏫 Instructor Panel</h1>
        <p style={{color: '#ddd', fontSize: '1.2rem'}}>{localStorage.getItem('userEmail')}</p>
      </div>

      {/* Stats Cards */}
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
          padding: '30px',
          borderRadius: '20px',
          textAlign: 'center'
        }}>
          <div style={{fontSize: '3rem'}}>📚</div>
          <div style={{fontSize: '2.5rem', fontWeight: 'bold'}}>{courses.length}</div>
          <div style={{color: '#666'}}>My Courses</div>
        </div>
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '20px',
          textAlign: 'center'
        }}>
          <div style={{fontSize: '3rem'}}>👥</div>
          <div style={{fontSize: '2.5rem', fontWeight: 'bold'}}>
            {courses.reduce((a, c) => a + (c.students || 0), 0)}
          </div>
          <div style={{color: '#666'}}>Students</div>
        </div>
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '20px',
          textAlign: 'center'
        }}>
          <div style={{fontSize: '3rem'}}>₹</div>
          <div style={{fontSize: '2.5rem', fontWeight: 'bold'}}>
            ₹{revenue.toLocaleString()}
          </div>
          <div style={{color: '#666'}}>Revenue</div>
        </div>
      </div>

      {/* Create Course */}
      <div style={{
        background: 'white',
        borderRadius: '20px',
        margin: '40px',
        padding: '30px'
      }}>
        <h2 style={{marginBottom: '20px', color: '#333'}}>➕ Create New Course</h2>
        <div style={{display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap'}}>
          <input
            placeholder="Course Title"
            value={newCourse.title}
            onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
            style={{padding: '15px', flex: 1, minWidth: '200px', border: '2px solid #ddd', borderRadius: '10px'}}
          />
          <input
            placeholder="Description"
            value={newCourse.description}
            onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
            style={{padding: '15px', flex: 1, minWidth: '200px', border: '2px solid #ddd', borderRadius: '10px'}}
          />
          <input
            placeholder="Price"
            type="number"
            value={newCourse.price}
            onChange={(e) => setNewCourse({...newCourse, price: e.target.value})}
            style={{padding: '15px', width: '120px', border: '2px solid #ddd', borderRadius: '10px'}}
          />
          <button
            onClick={addCourse}
            style={{
              background: '#11998e',
              color: 'white',
              padding: '15px 30px',
              border: 'none',
              borderRadius: '10px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Create Course
          </button>
        </div>

        {/* Add Lecture */}
        <h2 style={{marginBottom: '20px', color: '#333', marginTop: '40px'}}>🎥 Add Lecture</h2>
        <div style={{display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap'}}>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            style={{padding: '15px', flex: 1, minWidth: '200px', border: '2px solid #ddd', borderRadius: '10px'}}
          >
            <option value="">Select Course</option>
            {courses.map(c => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>
          <input
            placeholder="Lecture Title"
            value={newLecture.title}
            onChange={(e) => setNewLecture({...newLecture, title: e.target.value})}
            style={{padding: '15px', flex: 1, minWidth: '200px', border: '2px solid #ddd', borderRadius: '10px'}}
          />
          <input
            placeholder="Video URL (YouTube)"
            value={newLecture.url}
            onChange={(e) => setNewLecture({...newLecture, url: e.target.value})}
            style={{padding: '15px', flex: 1, minWidth: '200px', border: '2px solid #ddd', borderRadius: '10px'}}
          />
          <button
            onClick={addLecture}
            style={{
              background: '#11998e',
              color: 'white',
              padding: '15px 30px',
              border: 'none',
              borderRadius: '10px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Add Lecture
          </button>
        </div>

        {/* My Courses List */}
        <h2 style={{marginBottom: '20px', color: '#333', marginTop: '40px'}}>📚 My Courses</h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px'}}>
          {courses.map(course => (
            <div key={course.id} style={{
              background: '#f5f5f5',
              padding: '20px',
              borderRadius: '15px'
            }}>
              <h3 style={{fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px'}}>
                {course.title}
              </h3>
              <p style={{color: '#666', marginBottom: '10px'}}>{course.description}</p>
              <p style={{color: '#666', fontSize: '0.9rem'}}>
                Price: ₹{course.price} | Students: {course.students || 0} | Lectures: {course.lections?.length || 0}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;