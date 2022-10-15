const express = require('express')

const router = express.Router()

//controller functions
const { postBuyListing, postRentListing, viewBuyListings, viewRentListings, updateBuyListing, updateRentListing, deleteListing, getdetailbuy } = require('../controllers/listingController')

router.post('/post-buy', postBuyListing)
router.post('/post-rent', postRentListing)


router.get('/view-buy', viewBuyListings)
router.get('/view-rent', viewRentListings)
router.get('/view-detail-buy/:id', getdetailbuy)

router.put('/update-buy', updateBuyListing)
router.put('/update-rent', updateRentListing)



router.delete('/:id', deleteListing)

module.exports = router;
