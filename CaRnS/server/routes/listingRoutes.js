const express = require('express')

const router = express.Router()

//controller functions
const { postListing, viewListings } = require('../controllers/listingController')

router.post('/post', postListing)


router.get('/view', viewListings)



module.exports = router;
