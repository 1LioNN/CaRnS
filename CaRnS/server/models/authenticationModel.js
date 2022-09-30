 const mongoose = require('mongoose')

 const Schema = mongoose.Schema

 const authenticationSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
 }, {timestamp: true})

// static signup method
authenticationSchema.statics.signup = async function(email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    const exists = await this.findOne({ email })
    if (exists){
        throw Error('Email already in use')
    }

    const user = await this.create({ email, password})
    return user
}

// static signup method
authenticationSchema.statics.login = async function(email, password){
    if (!email || !password){
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })
    if (!user) {
        throw Error('Incorrect email')
    }

    if (password != user.password){
        throw Error('Incorrect password')
    }

    return user
}

 module.exports = mongoose.model('User', authenticationSchema)
 