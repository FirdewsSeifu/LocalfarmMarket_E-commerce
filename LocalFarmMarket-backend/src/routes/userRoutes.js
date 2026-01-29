// === routes/userRoutes.js ===
import express from 'express';
const router = express.Router();

import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import {
  getProfile,
  getAllUsers,
  registerUsers,
    getUserById,         
  updateUser,          
  deleteUser,          
  updateUserStatus,    
  updateUserRole,
  createUser   
} from '../controllers/userController.js';

// Only sellers can access all users (adjust as needed)
router.get('/getAllUsers', protect, authorizeRoles('seller'), getAllUsers);

// Public registration
router.post('/', registerUsers);

router.route('/')
    .post(registerUsers)
    .get(protect, authorizeRoles('seller'), getAllUsers);

    router.post('/create', protect, authorizeRoles('seller'), createUser);
router.route('/:id')
    .get(protect, authorizeRoles('seller'), getUserById)
    .put(protect, authorizeRoles('seller'), updateUser)
    .delete(protect, authorizeRoles('seller'), deleteUser);

router.patch('/:id/status', protect, authorizeRoles('seller'), updateUserStatus);
router.patch('/:id/role', protect, authorizeRoles('seller'), updateUserRole);
// Buyer or seller can get their own profile
router.get('/getProfile', protect, getProfile);



export default router;
