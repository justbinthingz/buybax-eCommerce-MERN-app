import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

// @desc Auth the user & get token
// @route POST /api/user/login
// @access Public
export const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    }
    else {
        res.status(401)
        throw new Error('Invalid email or Password')
    }

})


// @desc register a new  user
// @route POST /api/user
// @access Public
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (name == '' || email == '' || password == '') {
        res.status(401)
        throw new Error('Please enter all fields')
    }
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    }
    else {
        res.status(401)
        throw new Error('Invalid user')
    }

})

// @desc Fetch users' profile
// @route GET /api/user/profile
// @access Private
export const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin,
        })
    }
    else {
        res.status(404)
        throw new Error('User not found')
    }

})

// @desc update users' profile
// @route PUT /api/user/profile
// @access Private
export const updateUserProfile = asyncHandler(async (req, res) => {
    console.log("in backend")
    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password || user.password
        }

        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            email: updatedUser.email,
            name: updatedUser.name,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        })
    }
    else {
        res.status(404)
        throw new Error('User not found')
    }

})