import express from 'express';
import { 
  authUser, 
  registerUser, 
  getUserProfile, 
  updateUserProfile,
  getAllUsers,
  deleteUser 
} from '../controllers/userController.js';
import { protect, authorize } from '../middleware/authMiddleware.js'; // ← authorize import

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', authUser);

// Private routes (Sab users)
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

//  ADMIN ONLY ROUTES
router.get('/', protect, authorize('Admin'), getAllUsers);     // ← Admin only
router.delete('/:id', protect, authorize('Admin'), deleteUser); // ← Admin only

export default router;
