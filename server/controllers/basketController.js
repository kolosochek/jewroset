const APIError = require('../error/APIError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket, Device, BasketDevice} = require('../models/models')


const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id: id, email: email, role: role},
        process.env.SECRET,
        {expiresIn: '24h'}
    )
}
class BasketController {
    async getOrCreateUserBasket(req, res) {
        const {userId} = req.query;
        //const basket = await Basket.findOrCreate({where: {userId}, attributes: ['id', 'userId']})
        const basket = await Basket.findOrCreate({where: {userId}, include: BasketDevice})
        return res.json(basket[0])
    }

    async addItem(req, res, next){
        const {basketId, deviceId, quantity = 1} = req.body
        // debug
        console.log(`basketId, deviceId, quantity`)
        console.log(basketId, deviceId, quantity)
        //
        const id = basketId
        if(!basketId || !deviceId) {
            return next(APIError.badRequestError(`No basketId or deviceId was given!`))
        }
        const basket = await Basket.findOne({where: {id}})
        if (!basket) {
            return next(APIError.internalError(`Can't find basket by given id: ${basketId}`))
        }
        const basketDevice = BasketDevice.findByPk(deviceId, {
            include: [
                {model: Device, attributes: ['id', 'name', 'price']},
            ]
        })
        if(!basketDevice) {
            await BasketDevice.create({basketId: basketId, deviceId: deviceId, quantity: quantity})
        } else {
            next(APIError.internalError(`Can't add device with id ${deviceId} in basket with id ${basketId}`))
        }

        basket.reload()
        return res.json(basket)
    }
}

module.exports = new BasketController()
