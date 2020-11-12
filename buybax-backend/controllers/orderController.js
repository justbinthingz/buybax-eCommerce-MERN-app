import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @desc Create new order
// @route POST /api/orders
// @access Private
export const addOrderItems = asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body
    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')

    }
    else {
        console.log("shipping add", shippingAddress)

        const order = new Order({
            orderItems,
            user: req.user._id, //since its a protected id , we will be able to get it from the token
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })
        // console.log("creating th eodere", order)
        const createdOrder = await order.save()

        res.status(201).json(createdOrder)
    }
})



// @desc get order by Id
// @route GET /api/orders/:id
// @access Private
export const getOrderById = asyncHandler(async (req, res) => {
    const order = await (await Order.findById(req.params.id)).populate('user', 'name email')

    if (order) {
        res.json(order)
    }
    else {
        res.status(404)
        throw new Error('Order Not Found')
    }
})


// @desc update order to 'paid'
// @route PUT /api/orders/:id/pay
// @access Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        //the below details are from Paypal API
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }

        const updateOrder = await order.save()
        res.json(updateOrder)
    }
    else {
        res.status(404)
        throw new Error('Order Not Found')
    }
})

// @desc Get logged in user orders
// @route GET /api/orders/myorders
// @access Private
export const getMyOrders = asyncHandler(async (req, res) => {
    const order = await Order.find({ user: req.user._id })

    res.json(orders)
})