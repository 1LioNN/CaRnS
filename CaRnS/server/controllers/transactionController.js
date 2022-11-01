const Transaction = require('../models/TransactionModel')

const mongoose = require('mongoose')


const logTransaction = async (req, res) => {
    const { customerID, listingID, transactionAmount } = req.body

    try {
        const transaction = await Transaction.log(customerID, listingID, transactionAmount)
        res.status(200).json(transaction)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

module.exports = { logTransaction}