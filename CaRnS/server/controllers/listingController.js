const Listing = require('../models/listingModel')
const mongoose = require('mongoose')

// post buy listing
const postBuyListing = async (req, res) => {
    const { vendorID, listingName, isBuy ,buyListingDetails } = req.body

    try {
        const listing = await Listing.listBuy(vendorID, listingName, isBuy, buyListingDetails)
        res.status(200).json(listing)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//post rent listing
const postRentListing = async (req, res) => {
    const { vendorID, listingName, isBuy, rentListingDetails } = req.body

    try {
        const listing = await Listing.listRent(vendorID, listingName, isBuy, rentListingDetails)
        res.status(200).json(listing)
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

const getdetailbuy = async (req, res) => {
    const { id } = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Not a valid listing ID' })
    }
    
    const listing = await Listing.findById(id)
    if (!listing) {
        return res.status(404).json({ error: 'No such listing' })
    }
    if (!listing.buyListingDetails) {
        return res.status(404).json({ error: 'Missing details' })
    }
    
    
    
    res.status(200).json(listing)
}

const addRentListingDates = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Not a valid listing ID' })
    }
    
    const listing = await Listing.findById(id)
    if (!listing) {
        return res.status(404).json({ error: 'No such listing' })
    }

    const startDate = listing.rentListingDetails.availabilityStart
    const endDate = listing.rentListingDetails.availabilityEnd
    const rentDates = req.body.dates.map(dateString => new Date(dateString)).sort((a,b)=>a.getTime()-b.getTime()) //Sorting the dates
    const rentListingDetailsID = listing.rentListingDetails.id
    
    //Check if date isnt taken
    if(rentDates[0] >= startDate && rentDates[rentDates.length - 1] < endDate) { 
        try {
            


            return res.status(200).json(listing.rentListingDetails)
        } catch(error) {
            console.log(error)
            return res.status(404).json({error: 'Error updating dates'})
        }
    } else {
        return res.status(400).json({error: 'Invalid booking date'})
    }
} 

const removeRentListingDates = async (req, res) => {
    // const startDate = req.body.availabilityStart
    // const endDate = req.body.availabilityEnd
    // const today = new Date()

    // //Check if date isnt taken in listing array
    // if(today >= startDate && today < endDate) { 
    //     try {
    //         const listing = Listing.updateOne(
    //             {"rentListingDetails._id": req.params.id},
    //             {
    //                 $pull: {
    //                     "rentListingDetails.$.unavaliableDates": req.body.dates
    //                 }
    //             }
    //         )
    //         return res.status(200).json(listing)

    //     } catch(error) {
    //         return res.status(404).json({error: 'Listing not found'})
    //     }
    // } else {
    //     return res.status(400).json({error: 'Invalid booking date'})
    // }
} 

module.exports = { postBuyListing, postRentListing, viewBuyListings, viewRentListings, updateBuyListing, updateRentListing, deleteListing, getdetailbuy, addRentListingDates, removeRentListingDates }