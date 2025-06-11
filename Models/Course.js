import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    duration: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    createdBy: {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: 'Anonymous',
    },
    uid: {
      type: String,
      required: true,
    }},
    createdAt: {
        type: Date,
        default: Date.now,
    }
})
const Course = mongoose.model('Course', courseSchema);
export default Course;