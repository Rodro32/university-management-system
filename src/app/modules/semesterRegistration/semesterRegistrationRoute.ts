import express from 'express';
import { SemesterRegistrationValidation } from './semesterRegistrationValidation';
import { semesterRegistrationController } from './semesterRegistrationController';
import validateRequest from '../../midlewares/validateRequest';
const router = express.Router();

router.post('/create-semester-registration',
validateRequest(SemesterRegistrationValidation.createSemesterRegistrationValidationSchema),
semesterRegistrationController.createSemesterRegistration
)

router.get('/', semesterRegistrationController.getAllSemesterRegistration);

router.get('/:id', semesterRegistrationController.getSingleSemesterRegistration);

router.patch('/:id', semesterRegistrationController.updateSemesterRegistrationController);

export const semesterRegistrationRoute = router;