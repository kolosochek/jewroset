const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')

router.get('/', basketController.getOrCreateUserBasket)
router.post('/add', basketController.addItem)

module.exports = router
