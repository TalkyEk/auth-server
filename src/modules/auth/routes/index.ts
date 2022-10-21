import { Router } from 'express';
import authController from '../controllers/auth';
import { checkRefreshToken } from '../../../middlewares/checkRefreshToken';
import asyncHandler from 'express-async-handler';
import { registerValidation, loginValidation, checkValidation } from '../validations';

const router: Router = Router();

// Log in with email and password
router.post('/login', loginValidation, checkValidation, asyncHandler(authController.login));

// Register email and password
router.post('/register', registerValidation, checkValidation, asyncHandler(authController.register));

// Refresh token
router.post('/refresh', checkRefreshToken, asyncHandler(authController.refresh));

export default router;
