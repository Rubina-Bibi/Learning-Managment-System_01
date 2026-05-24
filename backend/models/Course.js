import mongoose from 'mongoose';
const courseSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, "Title is mandatory"] 
  },
  description: { 
    type: String, 
    required: [true, "Description is mandatory"]
  },
  instructor: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  category: { 
    type: String, 
    required: [true, "Category is mandatory"]
  },
  price: { 
    type: Number, 
    required: [true, "Price is mandatory"]
  },
  
  thumbnail: {
    type: String,
    default: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400"
  },
  enrolledStudents: { 
    type: Number, 
    default: 0 
  },
  duration: {
    type: String,
    default: "20 hours"
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Intermediate'
  },
  lessons: [{
    title: String,
    videoUrl: String,
    content: String
  }]
}, { timestamps: true });

//  Virtual field for students count (frontend compatibility)
courseSchema.virtual('students').get(function() {
  return this.enrolledStudents;
});

const Course = mongoose.model('Course', courseSchema);
export default Course;