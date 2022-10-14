const mongoose = require('mongoose')

const User = require('../models/authenticationModel')


const Schema = mongoose.Schema

const buyListingDetails = new Schema ({
    listingDescription: String,
    vehicleType: {
        type: String,
        required: true
    },
    salePrice: {
        type: Number,
        required: true
    }
})

const rentListingDetails = new Schema ({
    listingDescription: String,
    vehicleType: {
        type: String,
        required: true
    },
    rentPrice:{
        type: Number,
        required: true
    },
    availabilityStart:{
        type: Date,
        required: true
    },
    availabilityEnd:{
        type: Date,
        required: true
    },
    location:{
        type: String,
        required:true
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
    isBuy:{
        type: Boolean,
        required: true
    },
    buyListingDetails: {
        type: buyListingDetails,
    },
    rentListingDetails:{
        type: rentListingDetails
    }

}, { timestamps: true })


listingSchema.statics.listBuy = async function (vendorID, listingName, isBuy, buyListingDetails) {

    // validation
    if (!vendorID || !listingName || !isBuy, !buyListingDetails) {
      throw Error('All fields must be filled')
    }


    if (!buyListingDetails.vehicleType || !buyListingDetails.salePrice) {
        throw Error('All fields must be filled')
    }


    // create listing

    const listing = await this.create({ vendorID, listingName, isBuy, buyListingDetails })
    return listing
   
}

listingSchema.statics.listRent = async function (vendorID, listingName, isBuy, rentListingDetails) {

    // validation
    if (!vendorID || !listingName || !isBuy, !rentListingDetails) {
        throw Error('Gen - All fields must be filled')
    }


    if (!rentListingDetails.vehicleType || !rentListingDetails.rentPrice || !rentListingDetails.availabilityStart || !rentListingDetails.availabilityEnd || !rentListingDetails.location) {
        throw Error('Rent - All fields must be filled')
    }


    // create listing

    const listing = await this.create({ vendorID, listingName, isBuy, rentListingDetails })
    return listing

}


module.exports = mongoose.model('Listing', listingSchema)