const express = require('express')
const bodyParser = require('body-parser')

const authRouter = require('./auth')

const router = express.Router()

router.use(bodyParser.json())
router.use('/auth', authRouter)

module.exports = router
