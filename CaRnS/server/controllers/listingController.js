const Listing = require('../models/listingModel')


// post listing
const postListing = async (req, res) => {
    const { vendorID, listingName, listingType, vehicleType, listingSalePrice } = req.body

    try {
        const user = await Listing.list(vendorID, listingName, listingType, vehicleType, listingSalePrice)
        res.status(200).json({ vendorID, listingName, listingType, vehicleType, listingSalePrice })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


// view listings

const viewListings = async (req, res) => {
    const listings = await Listing.find({}).sort({createdAt: -1})
    res.status(200).json(listings)
}





module.exports = { postListing, viewListings }