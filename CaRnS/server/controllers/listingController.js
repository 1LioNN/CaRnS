const Listing = require('../models/listingModel')


// post listing
const postListing = async (req, res) => {
    const { vendorID, listingName, listingDetails } = req.body

    try {
        const user = await Listing.list(vendorID, listingName, listingDetails)
        res.status(200).json({ vendorID, listingName, listingDetails })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


// view listings

const viewBuyListings = async (req, res) => {
    const listings = await Listing.find({}).sort({createdAt: -1})
    res.status(200).json(listings)
}



module.exports = { postListing, viewBuyListings }