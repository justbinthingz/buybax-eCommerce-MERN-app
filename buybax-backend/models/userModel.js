import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: String,
        required: true,
        default: false
    },

}, {
    timestamps: true //for createdAt fields
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

//before we save a user, we want to encrypt the password.. hence we use 'pre' function
userSchema.pre('save', async function (next) {
    //so its hashing the password asynchronously, so we use method - genSalt - which generates a salt..that takes 10 rounds

    if (!this.isModified('password')) { //this is a mongoose function which chckes if password field is modified(only during modified we want to hash)
        next() //so when not modified we just goto next - middleware, out of this file. and if not then we will proceed to below statements where we hash
    }
    const salt = await bcrypt.genSalt(10) //since it returns a promise we have await
    this.password = await bcrypt.hash(this.password, salt) //now we are resetting th plain password to hash password
})

const User = mongoose.model('User', userSchema)

export default User