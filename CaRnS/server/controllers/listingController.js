const Listing = require('../models/listingModel')
const mongoose = require('mongoose')

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

const deleteListing = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Not a valid listing ID'})
    }

    const listing = await Listing.findOneAndDelete({_id: id})
    if (!listing) {
        return res.status(404).json({error: 'No such listing'})
    }

    res.status(200).json(listing)
}


module.exports = { postListing, viewBuyListings, deleteListing }