const Course = require('../models/Course');

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('instructor', 'name email');
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 2. create new course by instructor code
exports.createCourse = async (req, res) => {
    try {
        const { title, description, category, price, lessons } = req.body;
        
        const newCourse = new Course({
            title,
            description,
            category,
            price,
            instructor: req.user.id, //user id come from Middleware 
            lessons
        });

        const savedCourse = await newCourse.save();
        res.status(201).json(savedCourse);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// 3. Course delete by admin
exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: "Course not found" });

        await course.deleteOne();
        res.json({ message: "Course deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};