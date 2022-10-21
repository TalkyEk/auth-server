import { Router } from 'express';
import userController from '../controllers/user';
import { checkAuthorization } from '../../../middlewares/checkAuthorization';
import asyncHandler from 'express-async-handler';

const router: Router = Router();

// Get all users
router.get('/users', checkAuthorization, asyncHandler(userController.getUsers));

// Get user 
router.get('/user', checkAuthorization, asyncHandler(userController.getUser));

export default router;
