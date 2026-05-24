// src/pages/CourseList.js 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CourseList = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  //  9 COURSES WITH IMAGES
  const courses = [
    { id: 1, title: 'Full Stack Web Development', price: 5000, instructor: 'Rahul Sharma', description: 'Master MERN Stack with real-world projects', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500', color: '#667eea' },
    { id: 2, title: 'React Native Mobile Apps', price: 3500, instructor: 'Priya Singh', description: 'Build iOS & Android apps with React Native', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500', color: '#2ed573' },
    { id: 3, title: 'Python Data Science', price: 4500, instructor: 'Amit Kumar', description: 'Learn Python, Pandas, NumPy & Machine Learning', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500', color: '#ffa502' },
    { id: 4, title: 'UI/UX Design Mastery', price: 3000, instructor: 'Neha Patel', description: 'Design beautiful interfaces with Figma', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500', color: '#ff4757' },
    { id: 5, title: 'Digital Marketing', price: 2500, instructor: 'Vikram Singh', description: 'SEO, Social Media, Google Ads', image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=500', color: '#3742fa' },
    { id: 6, title: 'AWS Cloud Computing', price: 6000, instructor: 'Sanjay Gupta', description: 'Become AWS Certified professional', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500', color: '#70a1ff' },
    { id: 7, title: 'Machine Learning AI', price: 5500, instructor: 'Rajesh Kumar', description: 'Deep Learning & Neural Networks', image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500', color: '#ff6b81' },
    { id: 8, title: 'Blockchain Development', price: 4000, instructor: 'Sunita Rao', description: 'Smart Contracts, Solidity, Ethereum', image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500', color: '#7bed9f' },
    { id: 9, title: 'Cybersecurity Essentials', price: 4800, instructor: 'Anil Sharma', description: 'Ethical Hacking & Network Security', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500', color: '#ff4757' }
  ];

  const filtered = courses.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));

  //  ENROLL FUNCTION
  const enroll = (course) => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }
    const userEmail = localStorage.getItem('userEmail');
    const enrollments = JSON.parse(localStorage.getItem('lms_enrollments') || '[]');
    if (!enrollments.find(e => e.courseId === course.id && e.student === userEmail)) {
      enrollments.push({ courseId: course.id, student: userEmail, date: new Date().toISOString() });
      localStorage.setItem('lms_enrollments', JSON.stringify(enrollments));
      alert(' Successfully Enrolled!');
    } else {
      alert('Already enrolled!');
    }
  };

  return (
    <div style={{
      paddingTop: '80px',
      minHeight: '100vh',
      background: '#f8f9fa',
      paddingBottom: '60px'
    }}>
      
      {/* Header */}
      <div style={{textAlign: 'center', padding: '50px 20px 30px'}}>
        <h1 style={{fontSize: '3.5rem', fontWeight: '900', color: '#1a1a2e', marginBottom: '10px'}}>
          Premium <span style={{color: '#667eea'}}>Courses</span>
        </h1>
        <p style={{color: '#666', fontSize: '1.2rem', marginBottom: '30px'}}>
          Learn from world-class instructors • 9 Amazing Courses
        </p>
        
        {/* Search Bar */}
        <input
          type="text"
          placeholder="🔍 Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: '18px 30px',
            width: '100%',
            maxWidth: '500px',
            border: '3px solid #667eea',
            borderRadius: '50px',
            fontSize: '18px',
            outline: 'none'
          }}
        />
      </div>

      {/* 3x3 GRID */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '30px',
        padding: '20px 50px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {filtered.map(course => (
          <div key={course.id} style={{
            background: 'white',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 15px 40px rgba(0,0,0,0.12)',
            transition: 'all 0.3s',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-10px)';
            e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.2)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.12)';
          }}>
            
            {/* Image */}
            <div style={{
              width: '100%',
              height: '180px',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <img 
                src={course.image} 
                alt={course.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.style.background = course.color;
                  e.target.parentElement.innerHTML = '<span style="font-size:4rem;color:white;">📚</span>';
                }}
              />
              
              {/* Badge */}
              <div style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: course.color,
                color: 'white',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {course.id === 1 ? 'POPULAR' : course.id === 2 ? 'NEW' : course.id === 3 ? 'TRENDING' : 'COURSE'}
              </div>
            </div>
            
            {/* Course Info */}
            <div style={{padding: '25px'}}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                marginBottom: '10px',
                color: '#1a1a2e'
              }}>
                {course.title}
              </h3>
              
              <p style={{color: '#666', fontSize: '0.95rem', marginBottom: '12px'}}>
                {course.description}
              </p>
              
              <div style={{display: 'flex', gap: '15px', marginBottom: '15px'}}>
                <span style={{
                  background: '#f5f5f5',
                  padding: '5px 12px',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  color: '#666'
                }}>
                  👨‍🏫 {course.instructor}
                </span>
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '2px solid #f0f0f0',
                paddingTop: '15px'
              }}>
                <span style={{fontSize: '1.8rem', fontWeight: 'bold', color: '#2ed573'}}>
                  ₹{course.price.toLocaleString()}
                </span>
                <button 
                  onClick={() => enroll(course)}
                  style={{
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: 'white',
                    padding: '12px 28px',
                    borderRadius: '25px',
                    border: 'none',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;