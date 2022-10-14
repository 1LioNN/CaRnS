const Listing = require('../models/listingModel')
const mongoose = require('mongoose')

// post listing
const postBuyListing = async (req, res) => {
    const { vendorID, listingName, isBuy ,buyListingDetails } = req.body

    try {
        const user = await Listing.listBuy(vendorID, listingName, isBuy, buyListingDetails)
        res.status(200).json({ vendorID, listingName, isBuy, buyListingDetails })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const postRentListing = async (req, res) => {
    const { vendorID, listingName, isBuy, rentListingDetails } = req.body

    try {
        const user = await Listing.listRent(vendorID, listingName, isBuy, rentListingDetails)
        res.status(200).json({ vendorID, listingName, isBuy, rentListingDetails })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


// view buy listings
const viewBuyListings = async (req, res) => {
    const listings = await Listing.find({isBuy: true}).sort({createdAt: -1})
    res.status(200).json(listings)
}

// view rent listings
const viewRentListings = async (req, res) => {
    const listings = await Listing.find({ isBuy: false }).sort({ createdAt: -1 })
    res.status(200).json(listings)
}

const updateBuyListing = async (req, res) => {
    const {listingID, newSalePrice} = req.body

    if (!mongoose.Types.ObjectId.isValid(listingID)) {
        return res.status(404).json({ error: 'Not a valid listing ID' })
    }

    if (!newSalePrice) {
        return res.status(404).json({ error: 'Enter a new sale price' })
    }  

    const listing = await Listing.findById(listingID)
    if (!listing) {
        return res.status(404).json({ error: 'No such listing' })
    }
    if (listing.isBuy == false){
        return res.status(404).json({ error: 'No such listing' })
    }

    listing.buyListingDetails.salePrice = newSalePrice
    listing.save()

    res.status(200).json(listing)
}

const updateRentListing = async (req, res) => {
    const { listingID, newRentPrice, newStartDate, newEndDate, newLocation} = req.body

    if (!mongoose.Types.ObjectId.isValid(listingID)) {
        return res.status(404).json({ error: 'Not a valid listing ID' })
    }

    const listing = await Listing.findById(listingID)
    if (!listing) {
        return res.status(404).json({ error: 'No such listing' })
    }

    if (!newRentPrice && !newStartDate && !newEndDate && !newLocation){
        return res.status(404).json({ error: 'Enter updated information' })
    }
    if (listing.isBuy == true) {
        return res.status(404).json({ error: 'No such listing' })
    }

    

    if (newRentPrice){ listing.rentListingDetails.rentPrice = newRentPrice }
    if (newStartDate) { listing.rentListingDetails.availabilityStart = newStartDate }
    if (newEndDate) { listing.rentListingDetails.availabilityEnd = newEndDate }
    if (newLocation) { listing.rentListingDetails.location = newLocation }
    
    listing.save()

    res.status(200).json(listing)
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


module.exports = { postBuyListing, postRentListing, viewBuyListings, viewRentListings, updateBuyListing, updateRentListing, deleteListing }