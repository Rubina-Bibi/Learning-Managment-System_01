import express from 'express';
import Course from '../models/Course.js';
const router = express.Router();

// @desc    Get all courses 
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 }).limit(9);
    
    if (courses.length === 0) {
      console.log(' Database empty - sending 9 sample courses');
      return res.json(nineSampleCourses);
    }
    
    const formattedCourses = courses.map(course => ({
      _id: course._id,
      title: course.title,
      description: course.description,
      price: course.price,
      thumbnail: course.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400',
      category: course.category,
      instructor: course.instructor || 'LMS Instructor',
      duration: course.duration || '20 hours',
      level: course.level || 'Intermediate',
      students: course.enrolledStudents || 0,
      enrolledStudents: course.enrolledStudents || 0
    }));
    
    res.json(formattedCourses);
  } catch (error) {
    console.error(' Courses error:', error);
    res.json(nineSampleCourses);
  }
});

//  9 PERFECT COURSES (3x3 Grid)
const nineSampleCourses = [
  {
    _id: "1",
    title: "Full Stack Web Development",
    description: "Learn MERN stack from scratch with professional projects.",
    price: 5000,
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600",
    category: "Programming",
    instructor: "MERN Expert",
    duration: "40 hours",
    level: "Intermediate",
    students: 120,
    enrolledStudents: 120
  },
  {
    _id: "2",
    title: "Graphic Design & UI/UX",
    description: "Master Photoshop, Illustrator, and Figma for modern design.",
    price: 3500,
    thumbnail: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600",
    category: "Creative Arts",
    instructor: "Design Guru",
    duration: "25 hours",
    level: "Beginner",
    students: 89,
    enrolledStudents: 89
  },
  {
    _id: "3",
    title: "Python Programming",
    description: "Learn Python from basics to data science and automation.",
    price: 4000,
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600",
    category: "Programming",
    instructor: "Python Master",
    duration: "30 hours",
    level: "Beginner",
    students: 234,
    enrolledStudents: 234
  },
  {
    _id: "4",
    title: "Digital Marketing",
    description: "SEO, Social Media Marketing, and Google Ads expertise.",
    price: 2500,
    thumbnail: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=600",
    category: "Business",
    instructor: "Marketing Pro",
    duration: "20 hours",
    level: "Beginner",
    students: 156,
    enrolledStudents: 156
  },
  {
    _id: "5",
    title: "Video Editing & Animation",
    description: "Professional video editing using Premiere Pro and After Effects.",
    price: 4500,
    thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd4cf4d44d?w=600",
    category: "Media",
    instructor: "Video Expert",
    duration: "28 hours",
    level: "Intermediate",
    students: 67,
    enrolledStudents: 67
  },
  {
    _id: "6",
    title: "Web Development (MERN)",
    description: "Build full-stack applications using MongoDB, Express, React, and Node.",
    price: 6000,
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600",
    category: "Programming",
    instructor: "Full Stack Dev",
    duration: "45 hours",
    level: "Advanced",
    students: 345,
    enrolledStudents: 345
  },
  {
    _id: "7",
    title: "Mobile App Development",
    description: "Create Android and iOS apps using Flutter or React Native.",
    price: 5500,
    thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600",
    category: "Programming",
    instructor: "Mobile Dev",
    duration: "35 hours",
    level: "Intermediate",
    students: 189,
    enrolledStudents: 189
  },
  {
    _id: "8",
    title: "Cyber Security",
    description: "Protect systems and networks from digital attacks.",
    price: 7000,
    thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600",
    category: "IT Security",
    instructor: "Security Expert",
    duration: "32 hours",
    level: "Advanced",
    students: 98,
    enrolledStudents: 98
  },
  {
    _id: "9",
    title: "Machine Learning Basics",
    description: "Introduction to AI, Neural Networks, and Predictive Analytics.",
    price: 6500,
    thumbnail: "https://images.unsplash.com/photo-1620712943543-9a6d4ee5b9f4?w=600",
    category: "AI & ML",
    instructor: "AI Specialist",
    duration: "38 hours",
    level: "Advanced",
    students: 212,
    enrolledStudents: 212
  }
];

export default router;