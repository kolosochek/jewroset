const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/create', checkRoleMiddleware('ADMIN'), brandController.adminCreateBrand)
router.post('/update', checkRoleMiddleware('ADMIN'), brandController.adminUpdateBrand)
router.post('/remove', checkRoleMiddleware('ADMIN'), brandController.adminRemoveBrand)
router.get('/', brandController.getAll)

module.exports = router
