const mongoose = require('mongoose')

const User = require('../models/authenticationModel')


const Schema = mongoose.Schema

const listingSchema = new Schema({
    vendorID: {
        type: String,
        required: true,
    },
    listingName: {
        type: String,
        required: true
    },
    listingDetails:{
        type: listingDetails,
        required: true
    }

}, { timestamps: true })

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


listingSchema.statics.list = async function (vendorID, listingName, listingType, vehicleType, listingSalePrice) {
    // validation
    if (!vendorID || !listingName || !listingType || !vehicleType || !listingSalePrice) {
        throw Error('All fields must be filled')
    }

    if (listingType != "buy" && listingType != "rent") {
        throw Error('Invalid listing type')
    }

    // create listing
    const listing = await this.create({ vendorID, listingName, listingType, vehicleType, listingSalePrice })
    return listing
}



module.exports = mongoose.model('Listing', listingSchema)
