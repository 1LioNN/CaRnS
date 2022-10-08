const express = require('express')

const router = express.Router()

//controller functions
const { signupUser, loginUser } = require('../controllers/authenticationController')

router.post('/login', loginUser)


router.post('/signup', signupUser)


module.exports = router;
