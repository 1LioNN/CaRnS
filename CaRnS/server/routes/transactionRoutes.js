const express = require('express')

const router = express.Router()

const {logTransaction} = require('../controllers/transactionController')

router.post('/log', logTransaction)


module.exports = router;
