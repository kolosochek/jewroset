const Router = require('express')
const router = new Router()
const paymentController = require('../controllers/paymentController')

router.post('/create', paymentController.createPaymentIntent)

module.exports = router
