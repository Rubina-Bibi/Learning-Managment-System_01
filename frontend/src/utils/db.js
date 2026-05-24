// src/utils/db.js - Virtual Database
const DB = {
  // Initialize default data
  init: () => {
    if (!localStorage.getItem('lms_courses')) {
      localStorage.setItem('lms_courses', JSON.stringify([
        { id: 1, title: 'Full Stack Web Development', price: 5000, instructor: 'admin@lmspro.com', description: 'MERN Stack', lectures: [], students: 0 },
        { id: 2, title: 'React Native Mobile Apps', price: 3500, instructor: 'admin@lmspro.com', description: 'iOS & Android', lectures: [], students: 0 },
        { id: 3, title: 'Python Data Science', price: 4500, instructor: 'admin@lmspro.com', description: 'ML & AI', lectures: [], students: 0 }
      ]));
    }
    if (!localStorage.getItem('lms_instructors')) {
      localStorage.setItem('lms_instructors', JSON.stringify([
        { id: 1, name: 'Rahul Sharma', email: 'rahul@lmspro.com', active: true },
        { id: 2, name: 'Priya Singh', email: 'priya@lmspro.com', active: true }
      ]));
    }
    if (!localStorage.getItem('lms_enrollments')) {
      localStorage.setItem('lms_enrollments', JSON.stringify([]));
    }
  },

  // Courses
  getCourses: () => JSON.parse(localStorage.getItem('lms_courses') || '[]'),
  
  addCourse: (course) => {
    const courses = DB.getCourses();
    course.id = Date.now();
    course.students = 0;
    course.lectures = [];
    courses.push(course);
    localStorage.setItem('lms_courses', JSON.stringify(courses));
    return course;
  },
  
  deleteCourse: (id) => {
    const courses = DB.getCourses().filter(c => c.id !== id);
    localStorage.setItem('lms_courses', JSON.stringify(courses));
  },

  // Instructors (Admin)
  getInstructors: () => JSON.parse(localStorage.getItem('lms_instructors') || '[]'),
  
  addInstructor: (instructor) => {
    const instructors = DB.getInstructors();
    instructor.id = Date.now();
    instructor.active = true;
    instructors.push(instructor);
    localStorage.setItem('lms_instructors', JSON.stringify(instructors));
  },
  
  removeInstructor: (id) => {
    const instructors = DB.getInstructors().filter(i => i.id !== id);
    localStorage.setItem('lms_instructors', JSON.stringify(instructors));
  },

  // Enrollments (Student)
  getEnrollments: () => JSON.parse(localStorage.getItem('lms_enrollments') || '[]'),
  
  enroll: (courseId) => {
    const userEmail = localStorage.getItem('userEmail');
    const enrollments = DB.getEnrollments();
    if (!enrollments.find(e => e.courseId === courseId && e.student === userEmail)) {
      enrollments.push({ courseId, student: userEmail, date: new Date().toISOString() });
      localStorage.setItem('lms_enrollments', JSON.stringify(enrollments));
      
      // Update course students count
      const courses = DB.getCourses();
      const course = courses.find(c => c.id === courseId);
      if (course) { course.students = (course.students || 0) + 1; }
      localStorage.setItem('lms_courses', JSON.stringify(courses));
      return true;
    }
    return false;
  },

  // Lectures (Instructor)
  addLecture: (courseId, lecture) => {
    const courses = DB.getCourses();
    const course = courses.find(c => c.id === courseId);
    if (course) {
      course.lectures = course.lections || [];
      lecture.id = Date.now();
      course.lectures.push(lecture);
      localStorage.setItem('lms_courses', JSON.stringify(courses));
    }
  }
};

DB.init();
export default DB;