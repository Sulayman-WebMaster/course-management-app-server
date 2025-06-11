import express from 'express';
import { createCourse, getCourses, getCoursesByUser, getIndividualCourse, getLatestCourses, getPopularCourses,  myEnrollments, removeEnrollment, toggleEnrollment } from '../Controllers/CourseController.js';
import verifyToken from '../Middlewares/verityToken.js';
import AuthCheck from '../Middlewares/AuthCheck.js';


const router = express.Router();

router.post('/add-course/email',verifyToken,AuthCheck, createCourse);
router.patch('/courses/enroll/:courseId/email', verifyToken,AuthCheck, toggleEnrollment);
router.get('/myEnrollments/email', verifyToken,AuthCheck, myEnrollments);
router.get('/mycourses/email',verifyToken,AuthCheck, getCoursesByUser)
router.patch('/unenroll/:courseId/email', verifyToken,AuthCheck, removeEnrollment);


router.get('/courses', verifyToken, getCourses);
router.get('/latest-courses',getLatestCourses);
router.get('/courses/popular', getPopularCourses);
router.get('/course/:courseId', getIndividualCourse);

export default router;
