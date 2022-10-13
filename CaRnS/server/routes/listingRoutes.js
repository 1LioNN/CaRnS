const express = require('express')

const router = express.Router()

//controller functions
const { postBuyListing, postRentListing, viewBuyListings, viewRentListings ,deleteListing } = require('../controllers/listingController')

router.post('/post-buy', postBuyListing)

router.post('/post-rent', postRentListing)


router.get('/view-buy', viewBuyListings)
router.get('/view-rent', viewRentListings)



router.delete('/:id', deleteListing)

module.exports = router;
