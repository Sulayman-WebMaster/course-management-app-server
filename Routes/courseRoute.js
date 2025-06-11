import express from 'express';
import { createCourse } from '../Controllers/CourseController.js';
import verifyToken from '../Middlewares/verityToken.js';

const router = express.Router();

router.post('/add-course/email',verifyToken, createCourse);

export default router;
