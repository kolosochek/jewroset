const Router = require('express')
const router = new Router()
const categoryController = require('../controllers/categoryController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/create', checkRoleMiddleware('ADMIN'), categoryController.adminCreateCategory)
router.post('/update', checkRoleMiddleware('ADMIN'), categoryController.adminUpdateCategory)
router.post('/remove', checkRoleMiddleware('ADMIN'), categoryController.adminRemoveCategory)
router.get('/', categoryController.getAll)

module.exports = router
