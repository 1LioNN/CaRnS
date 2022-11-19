const express = require('express')

const router = express.Router()

const {logTransaction} = require('../controllers/transactionController')

router.post('/log', logTransaction)
router.get('/past-purchases', getPastPurchases)


module.exports = router;
