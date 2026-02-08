import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';
import { AnyZodObject } from 'zod';
import { studentZodSchema } from '../student/student.zod.validation';
import validateRequest from '../../midlewares/validateRequest';
import { createFacultyValidationSchema } from '../Faculty/faculty.validation';
import { createAdminValidationSchema } from '../Admin/admin.validation';
import auth from '../../midlewares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();



router.post(
  '/create-student'
  , auth(USER_ROLE.admin), validateRequest(studentZodSchema),
  userController.createStudent);

router.post(
  '/create-faculty',
  validateRequest(createFacultyValidationSchema),
  userController.createFaculty,
);
router.post(
  '/create-admin',
  validateRequest(createAdminValidationSchema),
  userController.createAdmin,
);

export const userRoute = router;