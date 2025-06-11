import express from 'express';
import { createCourse, getCourses, getLatestCourses, getPopularCourses, toggleEnrollment } from '../Controllers/CourseController.js';
import verifyToken from '../Middlewares/verityToken.js';

const router = express.Router();

router.post('/add-course/email',verifyToken, createCourse);
router.post('/courses/enroll/:courseId', verifyToken, toggleEnrollment);
router.get('/courses', verifyToken, getCourses);
router.get('/latest-courses',getLatestCourses);
router.get('/courses/popular', getPopularCourses);

export default router;
