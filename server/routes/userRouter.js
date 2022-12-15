const Router = require('express')
const userController = require('../controllers/userController')
const router = new Router()

router.post('/signup', userController.signup)
router.post('/signin', userController.signin)
router.get('/auth', userController.isAuthorized)

module.exports = router
