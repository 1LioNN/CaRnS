const mongoose = require('mongoose')
const { findById } = require('../models/authenticationModel')
const User = require('../models/authenticationModel')
const Listing = require('../models/listingModel')

const Schema = mongoose.Schema

const transactionSchema = new Schema({
    customerID: {
        type: String,
        required: true
    },
    vendorID: {
        type: String,
        required: true
    },
    listingID: {
        type: String,
        required: true
    },
    transactionAmount: {
        type: Number,
        required: true
    },
    dates: {
        type: [Date],
        default: undefined
    }
}, { timestamps: true })

//Convert start and end dates to an array of dates
function toDateArray(startDate, endDate) {
    let dateArray = []
    let date = new Date(startDate)
    let end = new Date(endDate)

    while (date <= end) {
        dateArray.push(new Date(date))
        date.setDate(date.getDate() + 1)
    }
    return dateArray
}

transactionSchema.statics.log = async function (customerID, listingID, bookingStartDate, bookingEndDate) {

    // validation
    if (!customerID || !listingID) {
        throw Error('Missing data to complete transaction')
    }

    //validate customer ID
    if (!mongoose.isValidObjectId(customerID)){
        throw Error('Not a valid customer ID')
    }

    const customer = await User.findById(customerID)

    if (!customer) {
        throw Error('Not a valid customer ID')
    }


    // validate listing ID
    if (!mongoose.isValidObjectId(listingID)) {
        throw Error('Not a valid listing ID')
    }
    const listing = await Listing.findById(listingID)
    if (!listing) {
        throw Error('Not a valid listing ID')
    } 

    vendorID = listing.vendorID

    if (listing.isBuy == true){
        listing.buyListingDetails.isActive = false
        const transactionAmount = listing.buyListingDetails.salePrice
        listing.save()
        const transaction = await this.create({ customerID, vendorID, listingID,  transactionAmount})
        return transaction
    } else {
        Listing.addRentListingDates(customerID, listingID, bookingStartDate, bookingEndDate)
        
        dates = toDateArray(bookingStartDate, bookingEndDate)
    
        if(dates.length == 0) {
            throw Error('Invalid booking date for transaction')
        }
            
        const transactionAmount = listing.rentListingDetails.rentPrice * dates.length  
        const transaction = await this.create({ customerID, vendorID, listingID, transactionAmount, dates })
        return transaction

    }
}

module.exports = mongoose.model('Transaction', transactionSchema)

