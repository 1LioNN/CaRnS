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
    },
    location:{
        type: String,
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
    location:{
        type: String,
        required:true
    },
    availabilityStart:{
        type: Date,
        required: true
    },
    availabilityEnd:{
        type: Date,
        required: true
    },
    allUnavailableDates: [{type: Date}],
    booking: [{ customerID: String, unavailableDates: [{type: Date}]}]
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
    if (!vendorID || !listingName || !isBuy || !buyListingDetails) {
      throw Error('Buy - All fields must be filled')
    }


    if (!buyListingDetails.vehicleType || !buyListingDetails.salePrice || !buyListingDetails.location) {
        throw Error('Buy - All fields must be filled')
    }

    if(!isBuy) {
        throw Error('isBuy must be true for a buy listing')
    }

    // create listing
    const listing = await this.create({ vendorID, listingName, isBuy, buyListingDetails })
    return listing
   
}

listingSchema.statics.listRent = async function (vendorID, listingName, isBuy, rentListingDetails) {
    // validation
    if (!vendorID || !listingName || isBuy == undefined || !rentListingDetails) {
        throw Error('Rent - All fields must be filled')
    }


    if (!rentListingDetails.vehicleType || !rentListingDetails.rentPrice || !rentListingDetails.availabilityStart || !rentListingDetails.availabilityEnd || !rentListingDetails.location) {
        throw Error('Rent - All fields must be filled')
    }

    if(isBuy) {
        throw Error('isBuy must be false for a rent listing')
    }

    rentListingDetails = {...rentListingDetails, "booking": [], "allUnavailableDates": []} //This line is merely for asethic purposes in the db

    // create listing
    const listing = await this.create({ vendorID, listingName, isBuy, rentListingDetails })
    return listing

}


module.exports = mongoose.model('Listing', listingSchema)