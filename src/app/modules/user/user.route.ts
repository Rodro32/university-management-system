import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';
import { AnyZodObject } from 'zod';
import { studentZodSchema } from '../student/student.zod.validation';
import validateRequest from '../../midlewares/validateRequest';
import { createFacultyValidationSchema } from '../Faculty/faculty.validation';

const router = express.Router();



router.post(
  '/create-student',validateRequest(studentZodSchema),
  userController.createStudent);

router.post(
  '/create-faculty',
  validateRequest(createFacultyValidationSchema),
  userController.createFaculty,
);

export const userRoute = router;