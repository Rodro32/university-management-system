import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';
import { AnyZodObject } from 'zod';
import { studentZodSchema } from '../student/student.zod.validation';
import validateRequest from '../../midlewares/validateRequest';

const router = express.Router();



router.post('/create-student',validateRequest(studentZodSchema),userController.createStudent);

export const userRoute = router;