const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', checkRoleMiddleware("ADMIN"), deviceController.adminCreateDevice)
router.post('/remove', checkRoleMiddleware("ADMIN"), deviceController.adminRemoveDevice)
router.post('/update', checkRoleMiddleware("ADMIN"), deviceController.adminUpdateDevice)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getById)
// admin
router.get('/all', checkRoleMiddleware("ADMIN"), deviceController.adminGetAll)

module.exports = router
