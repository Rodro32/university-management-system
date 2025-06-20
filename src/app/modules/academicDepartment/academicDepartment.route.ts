import express from 'express';
import validateRequest from '../../midlewares/validateRequest';
import { academicDepartmentValidation } from './academicDepartment.validation';
import { academicDepartmentController } from './academicDepartment.controller';

const router = express.Router();

router.post('/create-academic-department',
// validateRequest(
//   academicDepartmentValidation.
//   academicDepartmentValidationSchema),
academicDepartmentController.createAcademicDepartment)


router.get('/', academicDepartmentController.getAllDepartment);


export const academicDepartmentRoute = router;