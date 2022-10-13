
const User = require('../models/authenticationModel')
const mongoose = require('mongoose')

// login user
const loginUser = async(req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)
        req.session.user = user;
        res.status(200).json({ email, user })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


// signup user
const signupUser = async (req, res) => {
    const {email, password, userType} = req.body

    try {
        const user = await User.signup(email, password, userType)
        res.status(200).json({email, userType, user})
    }catch(error) {
        res.status(400).json({error: error.message})
    }
}

// get user profile
const getProfile = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Not a valid user ID'})
    }

    const user = await User.findById(id)
    if (!user) {
        return res.status(404).json({error: 'No such user'})
    }

    res.status(200).json(user.profile)
}

// edit user profile
const editProfile = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Not a valid user ID'})
    }

    const user = await User.findOneAndUpdate(
        {_id: id}, 
        {
            profile : {
                name: req.body.name,
                description: req.body.description,
            }
        }, 
        {
            upsert: true
        }
    )

    return res.status(200).json(user)

}

// delete user account
const deleteUser = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Not a valid user ID'})
    }

    const user = await User.findOneAndDelete({_id: id})
    if (!user) {
        return res.status(404).json({error: 'No such user'})
    }

    res.status(200).json(user) //might want to return something else
}

module.exports = {signupUser, loginUser, getProfile, editProfile, deleteUser}