const express = require('express')

const router = express.Router()

//controller functions
const { postListing, viewBuyListings, deleteListing } = require('../controllers/listingController')

router.post('/post', postListing)

router.get('/view-buy', viewBuyListings)

router.delete('/:id', deleteListing)

module.exports = router;
