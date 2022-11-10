const Transaction = require('../models/TransactionModel')
const Listing = require('../models/listingModel')

const mongoose = require('mongoose')


const logTransaction = async (req, res) => {
    const { customerID, listingID, transactionAmount, dates } = req.body
   
    const listing = await Listing.findById(listingID)
    
    let transaction;

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