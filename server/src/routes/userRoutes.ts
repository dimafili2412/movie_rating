import express from 'express';
import { isAdmin, isApproved, isAuthenticated } from '../middlewares/authMiddleware';
import { getHelloWorld, getAdmin, getApproved, getAllLoggedIn } from '../controllers/userController';

const router = express.Router();

router.get('/hello', getHelloWorld);
router.get('/admin', isAdmin, getAdmin);
router.get('/approved', isApproved, getApproved);
router.get('/all', isAuthenticated, getAllLoggedIn);

export { router as userRouter };
