const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')

router.get('/', basketController.getUserBasket)
router.post('/', basketController.setUserBasket)

module.exports = router
