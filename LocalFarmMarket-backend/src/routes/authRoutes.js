// === routes/auth.js ===
import express from 'express';
import { register, login, forgotPassword, resetPassword, getProfile, updateProfile } from '../controllers/authController.js';
import { loginRateLimiter } from '../middleware/rateLimiter.js'; 

const router = express.Router();

router.post("/register", register);
router.post("/login", loginRateLimiter, login);
router.post("/login", login);
router.get('/profile',  getProfile);
router.put('/profile',  updateProfile);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

export default router;