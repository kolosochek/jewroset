const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', checkRoleMiddleware("ADMIN"), deviceController.create)
router.get('/', deviceController.getAll)
router.get('/brand/:id', deviceController.getByBrand)
router.get('/category/:id', deviceController.getByCategory)
router.get('/:id', deviceController.getById)

module.exports = router
