const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')

router.get('/', basketController.getOrCreateBasket)
router.post('/increment', basketController.incrementItem)
router.post('/decrement', basketController.decrementItem)
router.post('/remove', basketController.removeItem)

module.exports = router
