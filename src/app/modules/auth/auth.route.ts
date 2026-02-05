import express from 'express';
import validateRequest from '../../midlewares/validateRequest';
import { authValidation } from './auth.validation';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post('/login',
validateRequest(authValidation.loginValidationSchema),
AuthController.loginUser)


export const AuthRoute = router;