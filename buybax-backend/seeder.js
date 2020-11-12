import mongoose from 'mongoose'

import dotenv from 'dotenv'
import users from './data/users.js'
import products from './data/products.js'
import Product from './models/productModel.js'
import User from './models/userModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users)

        const adminUser = createdUsers[0]._id

        const sampleProducts = products.map(product => {
            return { ...product, user: adminUser }
        })

        await Product.insertMany(sampleProducts)
        console.log("data imported")
        process.exit()



    } catch (error) {
        console.log("Error", error)
        process.exit(1) //exit with failure

    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log("data Destroyed")
        process.exit()



    } catch (error) {
        console.log("Error", error)
        process.exit(1) //exit with failure

    }
}

//in the command for eg: node seeder.js -d //the 2nd argument here is -d
if (process.argv[2] === '-d') {
    destroyData()
}
else {
    importData()
}