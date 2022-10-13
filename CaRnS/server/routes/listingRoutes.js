const express = require('express')

const router = express.Router()

//controller functions
const { postListing, viewBuyListings } = require('../controllers/listingController')

router.post('/post', postListing)


router.get('/view-buy', viewBuyListings)



module.exports = router;
