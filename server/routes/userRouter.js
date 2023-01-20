const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/signup', userController.signup)
router.post('/signin', userController.signin)
router.post('/find', userController.findUser)
router.post('/find/raw', userController.findUserRaw)
router.post('/update', userController.updateUser)
router.post('/auth', authMiddleware, userController.isAuthorized)
// admin
router.get('/all', checkRoleMiddleware("ADMIN"), userController.adminGetAll)

module.exports = router
