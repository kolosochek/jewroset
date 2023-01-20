const Router = require('express')
const router = new Router()
const orderController = require('../controllers/orderController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', orderController.createOrder)
router.post('/get', orderController.getOrders)
// Admin
router.get('/all', checkRoleMiddleware("ADMIN"), orderController.adminGetAll)
router.post('/update', checkRoleMiddleware("ADMIN"), orderController.adminUpdateOrder)
router.post('/remove', checkRoleMiddleware("ADMIN"), orderController.adminRemoveOrder)

module.exports = router
