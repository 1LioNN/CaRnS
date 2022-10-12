const express = require('express')

const router = express.Router()

//controller functions
const { signupUser, loginUser, getProfile, editProfile, deleteUser } = require('../controllers/authenticationController')

router.post('/login', loginUser)

router.post('/signup', signupUser)

router.get('/profile/:id', getProfile)

router.patch('/profile/:id', editProfile)

router.delete('/:id', deleteUser)

module.exports = router;
