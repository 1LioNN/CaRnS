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


transactionSchema.statics.log = async function (customerID, listingID, transactionAmount, dates) {

    // validation
    if (!customerID || !listingID ||!transactionAmount) {
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
        listing.save()
        const transaction = await this.create({ customerID, vendorID, listingID, transactionAmount })
        return transaction
    } else {
        
        if(dates.length == 0) {
            throw Error('No dates for the rent listing')
        }

        transactionAmount = transactionAmount * dates.length
        const transaction = await this.create({ customerID, vendorID, listingID, transactionAmount, dates })
        return transaction
    }
}

module.exports = mongoose.model('Transaction', transactionSchema)

