import express from 'express';
import cors from 'cors';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

//  GLOBAL  DATABASE 
let users = [];

//  9 COURSES GLOBAL ARRAY 

const courses = [
  { 
    id: 1, 
    title: "Web Development Bootcamp", 
    description: "Master HTML, CSS, JavaScript, React & Node.js. Build 10+ real projects!",
    instructor: "John Doe", 
    price: 99, 
    category: "Web Dev",
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=300&fit=crop"
  },
  { 
    id: 2, 
    title: "React Native Masterclass", 
    description: "Build cross-platform mobile apps for iOS & Android with React Native.",
    instructor: "Jane Smith", 
    price: 129, 
    category: "Mobile",
    thumbnail: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=300&fit=crop"
  },
  { 
    id: 3, 
    title: "Node.js & Express", 
    description: "Build scalable REST APIs, authentication, MongoDB integration.",
    instructor: "Mike Johnson", 
    price: 89, 
    category: "Backend",
    thumbnail: "https://images.unsplash.com/photo-1664527359289-95c5a066ee5b?w=500&h=300&fit=crop"
  },
  { 
    id: 4, 
    title: "Python Django", 
    description: "Full-stack web development with Django, PostgreSQL, authentication.",
    instructor: "Sarah Wilson", 
    price: 79, 
    category: "Backend",
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=500&h=300&fit=crop"
  },
  { 
    id: 5, 
    title: "Data Science with Python", 
    description: "Pandas, NumPy, Matplotlib, Scikit-learn. Real-world projects.",
    instructor: "David Brown", 
    price: 149, 
    category: "Data",
    thumbnail: "https://images.unsplash.com/photo-1721201623854-2c4b7d8b7b99?w=500&h=300&fit=crop"
  },
  { 
    id: 6, 
    title: "Machine Learning Basics", 
    description: "Neural networks, TensorFlow, Computer Vision, NLP projects.",
    instructor: "Emily Davis", 
    price: 199, 
    category: "AI",
    thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500&h=300&fit=crop"
  },
  { 
    id: 7, 
    title: "Digital Marketing", 
    description: "SEO, Google Ads, Social Media, Email Marketing strategies.",
    instructor: "Chris Lee", 
    price: 69, 
    category: "Marketing",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop"
  },
  { 
    id: 8, 
    title: "UI/UX Design", 
    description: "Figma, Adobe XD, User Research, Prototyping, Design Systems.",
    instructor: "Lisa Chen", 
    price: 89, 
    category: "Design",
    thumbnail: "https://images.unsplash.com/photo-1559028005-4e105e10a0b9?w=500&h=300&fit=crop"
  },
  { 
    id: 9, 
    title: "DevOps Fundamentals", 
    description: "Docker, Kubernetes, CI/CD, AWS, Cloud Infrastructure.",
    instructor: "Tom Wilson", 
    price: 119, 
    category: "DevOps",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&h=300&fit=crop"
  }
];

// REGISTER ROUTE 
app.post('/api/users/register', (req, res) => {
  try {
    console.log(' Register data:', req.body);
    
    const { name, email, password, role } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ 
        message: 'Name, email, and password are required!' 
      });
    }
    
    if (users.find(user => user.email === email)) {
      return res.status(400).json({ 
        message: 'User already exists with this email!' 
      });
    }
    
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role: role || 'student'
    };
    
    users.push(newUser);
    console.log(' User created:', newUser.name);
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully!',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
    
  } catch (error) {
    console.error(' Register error:', error);
    res.status(500).json({ message: 'Server error!' });
  }
});

//  COURSES ROUTES 
app.get('/api/courses', (req, res) => {
  console.log(' All courses requested - Count:', courses.length);
  res.json({
    success: true,
    count: courses.length,  // 9 aayega!
    data: courses
  });
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).json({ message: 'Course not found' });
  }
  res.json(course);
});

// LOGIN ROUTE 
app.post('/api/users/login', (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials!' });
    }
    
    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Login error!' });
  }
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Backend Perfect! 🚀',
    usersCount: users.length,
    coursesCount: courses.length  
  });
});

app.get('/', (req, res) => {
  res.json({ message: 'API Running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server: http://localhost:${PORT}`);
  console.log(` Test: http://localhost:${PORT}/api/test`);
  console.log(` Courses: http://localhost:${PORT}/api/courses`);
});