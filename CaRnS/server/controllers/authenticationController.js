
const User = require('../models/authenticationModel')


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

module.exports = {signupUser, loginUser}