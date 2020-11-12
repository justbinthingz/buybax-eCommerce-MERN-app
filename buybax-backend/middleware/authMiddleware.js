import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import expressAsyncHandler from 'express-async-handler'

export const protect = expressAsyncHandler(async (req, res, next) => {
    console.log("im here protect middlwer")
    //token will be sent in headers - authorization
    let token

    //we want to see 1. if there is token and 2. if it startes with Bearer
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        console.log('toekn found')
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
        }
        catch (error) {
            console.log("err", error)
            res.status(401) // it means token has failed,
            throw new Error('Not authorized,token failed')
        }
    }

    if (!token) {
        // else {
        console.log("no token")
        res.status(401)
        throw new Error('Not authorized, no token')
    }

    next() //since its a middleware
})