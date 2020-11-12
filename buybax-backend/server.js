// const express = require('express');//similar to frontend import, a commonjs way to 
// const dotenv = require('dotenv')
// const products = require('./data/products')

import express from 'express';//similar to frontend import, a commonjs way to 
import dotenv from 'dotenv';
import products from './data/products.js';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json()) //to access req.body since this allows json now

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    res.send('API is running...')
})

app.use('/api/products', productRoutes)
app.use('/api/user', userRoutes)
app.use('/api/orders', orderRoutes)


// app.use('/api/orders', (req, res) => {
//     console.log("body is here", req.body)
//     console.log("header is here ", req.headers.authorization)
// })

app.get('/api/config/paypal', (req, res) =>
    res.send(process.env.PAYPAL_CLIENT_ID)
)

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))