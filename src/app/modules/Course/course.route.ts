import express from 'express';
import { CourseValidation } from './course.validation';
import validateRequest from '../../midlewares/validateRequest';
import { CourseControllers } from './course.controller';

const router = express.Router();

router.post('/create-course',
validateRequest(CourseValidation.createCourseValidationSchema),
CourseControllers.createCourse)

router.patch('/:id',
validateRequest( CourseValidation.updateCourseValidationSchema),
CourseControllers.updateCourse);


router.get('/:id', CourseControllers.getSingleCourse)

router.get('/', CourseControllers.getAllCourses);

router.delete('/:id', CourseControllers.deleteCourse);

export const CourseRoute = router;