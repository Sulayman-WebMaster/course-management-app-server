import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageURL: { type: String, required: true },
  duration: { type: String, required: true },
  totalSeats: { type: Number, required: true },
  enrolledUsers: [
    {
      uid: { type: String, required: true },
      email: { type: String, required: true }
    }
  ],
  createdBy: {
    email: { type: String, required: true },
    name: { type: String, required: true },
    uid: { type: String, required: true }
  }
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

export default Course;
