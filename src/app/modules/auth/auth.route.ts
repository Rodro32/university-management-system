import express from 'express';
import validateRequest from '../../midlewares/validateRequest';
import { authValidation } from './auth.validation';
import { AuthController } from './auth.controller';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../midlewares/auth';

const router = express.Router();

router.post('/login',
validateRequest(authValidation.loginValidationSchema),
AuthController.loginUser)

router.post('/password-change', auth(USER_ROLE.admin,USER_ROLE.faculty,USER_ROLE.student),
validateRequest(authValidation.changePasswordValidationSchema),
AuthController.changePassword)

router.post('/forget-password',
validateRequest(authValidation.forgetPasswordValidationSchema),
AuthController.forgetPassword)


export const AuthRoute = router;