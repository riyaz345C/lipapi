const express = require('express')
const router = express.Router()
const getmiddleware = require('../middleware/getMiddleware')

router.get('/',getmiddleware,require('../controller/getController').get)

module.exports = router