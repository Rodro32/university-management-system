import express from 'express';
import { academicSemesterController } from './academicSemester.controller';
import validateRequest from '../../midlewares/validateRequest';
import { academicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.post('/create-academic-semester',
validateRequest(academicSemesterValidation.academicSemesterValidationSchema),
academicSemesterController.createAcademicSemester)


export const academicSemesterRoute = router;