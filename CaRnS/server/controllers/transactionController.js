const Transaction = require('../models/TransactionModel')
const Listing = require('../models/listingModel')

const mongoose = require('mongoose')

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

const logTransaction = async (req, res) => {
    const { customerID, listingID, transactionAmount, bookingStartDate, bookingEndDate } = req.body
   
    const listing = await Listing.findById(listingID)
    
    let transaction;
    let dates = toDateArray(bookingStartDate, bookingEndDate)

    if(dates.length == 0) {
        return res.status(400).json({error: 'Invalid booking date for transaction'})
    }

    try {
        if(listing.isBuy == true) {
            transaction = await Transaction.log(customerID, listingID, transactionAmount)
        } else {
            transaction = await Transaction.log(customerID, listingID, transactionAmount, dates)
        }
        res.status(200).json(transaction)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
    
}

module.exports = { logTransaction }