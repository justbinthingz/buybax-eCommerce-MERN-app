import express from 'express'
import { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders } from '../controllers/orderController.js'
const router = express.Router()
import { protect } from '../middleware/authMiddleware.js'


router.route('/').post(protect, addOrderItems) //its protected, so we are adding our custom 'protect' middleware
router.route('/myorders').get(protect, getMyOrders) //its protected, so we are adding our custom 'protect' middleware
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)

export default router