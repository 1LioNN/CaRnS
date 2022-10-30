const Listing = require('../models/listingModel')
const mongoose = require('mongoose')

// post buy listing
const postBuyListing = async (req, res) => {
    const { listingName, isBuy ,buyListingDetails } = req.body

    try {
        const listing = await Listing.listBuy(req.session.user._id, listingName, isBuy, buyListingDetails)
        res.status(200).json(listing)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//post rent listing
const postRentListing = async (req, res) => {
    const { listingName, isBuy, rentListingDetails } = req.body

    try {
        const listing = await Listing.listRent(req.session.user._id, listingName, isBuy, rentListingDetails)
        res.status(200).json(listing)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


// view buy listings
const viewBuyListings = async (req, res) => {
    const listings = await Listing.find({isBuy: true, 'buyListingDetails.isActive': true}).sort({createdAt: -1})
    res.status(200).json(listings)
}

const viewActiveBuyListings = async (req, res) => {
    const { id } = req.params
    const listings = await Listing.find({isBuy: true, vendorID: id, 'buyListingDetails.isActive': true}).sort({createdAt: -1})
    res.status(200).json(listings)
}

const viewPastBuyListings = async (req, res) => {
    const { id } = req.params
    const listings = await Listing.find({isBuy: true, vendorID: id, 'buyListingDetails.isActive': false}).sort({createdAt: -1})
    res.status(200).json(listings)
}

// view rent listings
const viewRentListings = async (req, res) => {
    const listings = await Listing.find({ isBuy: false }).sort({ createdAt: -1 })
    res.status(200).json(listings)
}

const updateBuyListing = async (req, res) => {
    const { id } = req.params
    const { newListingDescription, newSalePrice, newLocation } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Not a valid listing ID' })
    }

    if (!newSalePrice) {
        return res.status(400).json({ error: 'Enter a new sale price' })
    }  

    const listing = await Listing.findById(id)
    if (!listing) {
        return res.status(404).json({ error: 'No such listing' })
    }
    if (listing.isBuy == false){
        return res.status(400).json({ error: 'Not a buy listing' })
    }

    if (newListingDescription) { listing.buyListingDetails.listingDescription = newListingDescription }
    if (newSalePrice) { listing.buyListingDetails.salePrice = newSalePrice }
    if (newLocation) { listing.buyListingDetails.location = newLocation }

    listing.save()

    res.status(200).json(listing)
}

const updateRentListing = async (req, res) => {
    const { id }  = req.params
    const { newListingDescription, newRentPrice, newLocation } = req.body
    let { newStartDate, newEndDate } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Not a valid listing ID' })
    }

    const listing = await Listing.findById(id)
    if (!listing) {
        return res.status(404).json({ error: 'No such listing' })
    }

    if (!newRentPrice && !newStartDate && !newEndDate && !newLocation){
        return res.status(400).json({ error: 'Enter updated information' })
    }
    if (listing.isBuy == true) {
        return res.status(400).json({ error: 'Not a rent listing' })
    }

    try {
        if(newStartDate) {newStartDate = new Date(newStartDate)}
        if(newEndDate) {newEndDate = new Date(newEndDate)}
    } catch (error) {
        return res.status(400).json({ error: 'Not a valid date input' })
    }
    
    if (newListingDescription) { listing.rentListingDetails.listingDescription = newListingDescription}
    if (newRentPrice){ listing.rentListingDetails.rentPrice = newRentPrice }
    if (newStartDate) {
        if(newStartDate < listing.rentListingDetails.availabilityEnd) {
            listing.rentListingDetails.availabilityStart = newStartDate
        } else {
            return res.status(400).json({ error: 'Invalid new start date' })
        }            
    }
    if (newEndDate) { 
        console.log(newEndDate, listing.rentListingDetails.availabilityStart)
        if(newEndDate > listing.rentListingDetails.availabilityStart) {
            listing.rentListingDetails.availabilityEnd = newEndDate
        } else {
            return res.status(400).json({ error: 'Invalid new end date' })
        }   
         
    }
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

//Check if date is in array
function isInArray(array, value) {
    return !!array.find(item => {return item.getTime() == value.getTime()})
}

const addRentListingDates = async (req, res) => {
    const { id } = req.params
    const { customerID } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Not a valid listing ID' })
    }
    
    const listing = await Listing.findById(id)
    if (!listing) {
        return res.status(404).json({ error: 'No such listing' })
    }

    const startDate = listing.rentListingDetails.availabilityStart
    const endDate = listing.rentListingDetails.availabilityEnd

    //Sorting the dates
    let rentDates = req.body.dates.map(dateString => new Date(dateString)).sort((a,b)=>a.getTime()-b.getTime()) 
    let bookingDates = rentDates //Save original (non-concated) booking dates

    //Check if dates are between bounds
    if(rentDates[0] >= startDate && rentDates[rentDates.length - 1] < endDate) {
        //Check if date is taken
        for(let i = 0; i < rentDates.length; i++) {
            if(isInArray(listing.rentListingDetails.allUnavailableDates, rentDates[i])) {
                return res.status(400).json({error: 'Date is already taken'})
            }
        }

        try {
            //Merge date lists and update allUnavailableDates
            rentDates = rentDates.concat(listing.rentListingDetails.allUnavailableDates)
            rentDates.sort((a,b)=>a.getTime()-b.getTime())
            listing.rentListingDetails.allUnavailableDates = rentDates
            
            //Create and update booking object
            if(listing.rentListingDetails.booking.dates != null) {
                listing.rentListingDetails.booking.push({ "customerID": customerID, "dates": bookingDates.concat(listing.rentListingDetails.booking.dates)})
            } else {
                listing.rentListingDetails.booking.push({ "customerID": customerID, "dates": bookingDates })
            }
            //Check if customerID is in bookings, $push?

            listing.save()

            return res.status(200).json(listing.rentListingDetails)
        } catch(error) {
            return res.status(404).json({error: 'Error updating dates'})
        }
    } else {
        return res.status(400).json({error: 'Invalid booking date'})
    }
} 

const removeRentListingDates = async (req, res) => {

} 

module.exports = { postBuyListing, postRentListing, viewBuyListings, viewRentListings, updateBuyListing, updateRentListing, deleteListing, getdetailbuy, addRentListingDates, removeRentListingDates, viewActiveBuyListings, viewPastBuyListings }