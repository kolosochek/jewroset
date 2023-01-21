const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

// admin
router.post('/', checkRoleMiddleware("ADMIN"), deviceController.adminCreateDevice)
router.get('/all', checkRoleMiddleware("ADMIN"), deviceController.adminGetAll)
router.post('/remove', checkRoleMiddleware("ADMIN"), deviceController.adminRemoveDevice)
router.post('/update', checkRoleMiddleware("ADMIN"), deviceController.adminUpdateDevice)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getById)


module.exports = router
