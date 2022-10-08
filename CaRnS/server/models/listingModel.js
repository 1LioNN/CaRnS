const mongoose = require('mongoose')

const User = require('../models/authenticationModel')


const Schema = mongoose.Schema

const listingDetails = new Schema ({
    listingDescription: String,

    isBuy: {
        type: Boolean,
        required: true
    },
    vehicleType: {
        type: String,
        required: true
    },
    listingSalePrice: {
        type: Number,
        required: true
    }
})

const listingSchema = new Schema({
    vendorID: {
        type: String,
        required: true,
    },
    listingName: {
        type: String,
        required: true
    },
    listingDetails: {
        type: listingDetails,
        required: true
    }

}, { timestamps: true })


listingSchema.statics.list = async function (vendorID, listingName, listingDetails) {

    // validation
    if (!vendorID || !listingName || !listingDetails.isBuy || !listingDetails.vehicleType || !listingDetails.listingSalePrice) {
      throw Error('All fields must be filled')
    }

    // create listing
    const listing = await this.create({ vendorID, listingName, listingDetails })
    return listing
}


module.exports = mongoose.model('Listing', listingSchema)