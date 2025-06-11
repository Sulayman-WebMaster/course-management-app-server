import express from 'express';
import { createCourse, getCourses, getIndividualCourse, getLatestCourses, getPopularCourses, toggleEnrollment } from '../Controllers/CourseController.js';
import verifyToken from '../Middlewares/verityToken.js';

const router = express.Router();

router.post('/add-course/email',verifyToken, createCourse);
router.patch('/courses/enroll/:courseId', verifyToken, toggleEnrollment);
router.get('/courses', verifyToken, getCourses);
router.get('/latest-courses',getLatestCourses);
router.get('/courses/popular', getPopularCourses);
router.get('/course/:courseId', getIndividualCourse);

export default router;
