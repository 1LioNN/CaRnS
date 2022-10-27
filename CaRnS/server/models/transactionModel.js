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
    }
}, { timestamps: true })


transactionSchema.statics.log = async function (customerID, listingID, transactionAmount) {

    // validation
    if (!customerID || !listingID ||!transactionAmount) {
        throw Error('Missing data to complete transaction')
    }


    
    //validate customer ID
    if (! mongoose.isValidObjectId(customerID)){
        return res.status(404).json({ error: 'Not a valid customer ID' })
    }
    const customer = await User.findById(customerID)
    if (!customer) {
        return res.status(404).json({ error: 'Not a valid customer ID' })
    }


    // validate listing ID
    if (!mongoose.isValidObjectId(listingID)) {
        return res.status(404).json({ error: 'Not a valid listing ID' })
    }
    const listing = await Listing.findById(listingID)
    if (!listing) {
        return res.status(404).json({ error: 'Not a valid listing ID' })
    } 

    vendorID = listing.vendorID





    // create transaction
    const transaction = await this.create({ customerID, vendorID, listingID, transactionAmount })
    return transaction

}

module.exports = mongoose.model('Transaction', transactionSchema)

