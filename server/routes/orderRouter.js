const Router = require('express')
const router = new Router()
const orderController = require('../controllers/orderController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', orderController.createOrder)
router.post('/get', orderController.getOrders)
// admin
router.get('/all', authMiddleware, orderController.adminGetAll)
router.post('/update', authMiddleware, orderController.adminUpdateOrder)
router.post('/remove', authMiddleware, orderController.adminRemoveOrder)

module.exports = router
