import express from 'express';
import { studentController } from './student.controller';
import validateRequest from '../../midlewares/validateRequest';
import { updateStudentZodSchema } from './student.zod.validation';

const router = express.Router();


router.get('/', studentController.getAllStudent);

router.get('/:id',studentController.getSingleStudent)

router.patch('/:id',
validateRequest( updateStudentZodSchema),
studentController.updateSingleStudent)

router.delete('/:id',studentController.deleteSingleStudent)

export const studentRoute = router;