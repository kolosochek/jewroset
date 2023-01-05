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
        const basket = await Basket.findOrCreate({
            where: {userId}, include: [
                {model: BasketDevice}
            ]
        })
        return res.json(basket[0])
    }

    async addItem(req, res, next) {
        const {basketId, id = basketId, deviceId, quantity = 1} = req.body
        // debug
        console.log(`basketId, deviceId, quantity`)
        console.log(basketId, deviceId, quantity)
        //
        if (!basketId || !deviceId) {
            return next(APIError.badRequestError(`No basketId or deviceId was given!`))
        }
        const basket = await Basket.findOne({where: {id}})
        if (!basket) {
            return next(APIError.internalError(`Can't find basket by given id: ${basketId}`))
        }
        // if device is already in the cart
        let basketDevice = await BasketDevice.findOne({where: [{basketId: basketId, deviceId: deviceId}]})
        // otherwise let's add device with given id in the cart
        if (!basketDevice) {
            basketDevice = await BasketDevice.create({basketId: basketId, deviceId: deviceId, quantity: quantity})
        } else {
            const resultQuantity = basketDevice.quantity + 1;
            await basketDevice.update({quantity: resultQuantity})
        }

        await basket.reload({include:
                {
                    model: BasketDevice,
                    where: {basketId}
                }})
        // debug
        console.log(`basket`)
        console.log(basket)
        console.log(`basketDevice`)
        console.log(basketDevice)
        //
        return res.json(basket)
    }
}

module.exports = new BasketController()
