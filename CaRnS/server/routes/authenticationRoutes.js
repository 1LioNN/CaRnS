const express = require('express')

const router = express.Router()

//controller functions
const { signupUser, loginUser } = require('../controllers/authenticationController')

router.post('/login', loginUser)


router.post('/signup', signupUser)


// test - to be removed
router.get('/', (req, res) =>{
    res.json({mssg: "GET Request"})
})

module.exports = router;
