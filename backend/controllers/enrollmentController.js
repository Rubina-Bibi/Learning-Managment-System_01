const Enrollment = require('../models/Enrollment');

// 1. enroll in new course
exports.enrollInCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        
        // Check if already enrolled
        const alreadyEnrolled = await Enrollment.findOne({ student: req.user.id, course: courseId });
        if (alreadyEnrolled) return res.status(400).json({ message: "Already enrolled" });

        const enrollment = new Enrollment({
            student: req.user.id,
            course: courseId
        });

        await enrollment.save();
        res.status(201).json({ message: "Enrolled successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 2. the courses in which student enrolled
exports.getMyCourses = async (req, res) => {
    try {
        const myCourses = await Enrollment.find({ student: req.user.id }).populate('course');
        res.json(myCourses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};