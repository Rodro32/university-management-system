import express from 'express';
import validateRequest from '../../midlewares/validateRequest';
import { academicFacultyValidation } from './academicFacultyValidation';
import { academicFacultyController } from './academicFacutlty.controller';

const router = express.Router();

router.post('/create-academic-faculty',
validateRequest(academicFacultyValidation.academicFacultyValidationSchema),
academicFacultyController.createAcademicFaculty)


router.get('/', academicFacultyController.getAllFaculty);


export const academicFacultyRoute = router;