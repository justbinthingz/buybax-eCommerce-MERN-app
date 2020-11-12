import express from 'express'
import { authUser, getUserProfile, registerUser, updateUserProfile } from '../controllers/userController.js'
const router = express.Router()
import { protect } from '../middleware/authMiddleware.js'


router.route('/').post(registerUser)

router.route('/login').post(authUser)

router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile) //its protected, so we are adding our custom 'protect' middleware

export default router