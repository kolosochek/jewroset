const APIError = require('../error/APIError')
const {Basket, Device, BasketDevice} = require('../models/models')


class BasketController {
    async getOrCreateBasket(req, res) {
        const {userId} = req.query;
        const basket = await Basket.findOrCreate({
            where: {
                userId: userId,
                status: 'open',
            }, include: [
                {
                    model: BasketDevice,
                    include: Device,
                    order: [['createdAt', 'desc']],
                }
            ],
        })
        return res.json(basket[0])
    }


    async createBasket(req, res) {
        const {userId, status} = req.body.params;
        const basket = await Basket.create({
            userId: userId,
            status: status ? status : 'open',
        })
        return res.json(basket)
    }

    async clearBasket(req, res, next) {
        const {userId, basketId} = req.body;
        const oldBasket = await Basket.findOne({
            where: {
                id: basketId
            }
        })
        if (!oldBasket) {
            return next(APIError.internalError(`Can't find old basket by given id: ${basketId}`))
        }
        oldBasket.update({status: 'closed'})
        const basket = await Basket.findOrCreate({
            where: {
                userId: userId,
                status: 'open',
            }, include: [
                {
                    model: BasketDevice,
                    include: Device,
                    order: [['createdAt', 'desc']],
                }
            ]
        })
        return res.json(basket[0])
    }

    async incrementItem(req, res, next) {
        const {basketId, deviceId, quantity = 1} = req.body
        if (!basketId || !deviceId) {
            return next(APIError.badRequestError(`No basketId or deviceId was given!`))
        }
        const basket = await Basket.findOne({where: {id: basketId}})
        if (!basket) {
            return next(APIError.internalError(`Can't find basket by given id: ${basketId}`))
        }
        // if device is already in the cart
        let basketDevice = await BasketDevice.findOne({
            where: [{basketId: basketId, deviceId: deviceId}]
        })
        // otherwise let's add device with given id in the cart
        if (!basketDevice) {
            basketDevice = await BasketDevice.create({basketId: basketId, deviceId: deviceId, quantity: quantity})
        } else {
            const resultQuantity = basketDevice.quantity + quantity;
            await basketDevice.update({quantity: resultQuantity})
        }
        // reload basket instance with added basketDevices
        await basket.reload({
            include:
                {
                    model: BasketDevice,
                    where: {basketId},
                    include: Device
                },
            order: [[BasketDevice, 'createdAt', 'desc']]
        })
        return res.json(basket)
    }

    async decrementItem(req, res, next) {
        const {basketId, deviceId, quantity = 1} = req.body
        if (!basketId || !deviceId) {
            return next(APIError.badRequestError(`No basketId or deviceId was given!`))
        }
        const basket = await Basket.findOne({where: {id: basketId}})
        if (!basket) {
            return next(APIError.internalError(`Can't find basket by given id: ${basketId}`))
        }
        // get basketDevice from cart
        let basketDevice = await BasketDevice.findOne({
            where: [{basketId: basketId, deviceId: deviceId}]
        })
        // if device is already in the cart
        if (basketDevice) {
            // decrement or remove it
            if (basketDevice.quantity > 1) {
                const resultQuantity = basketDevice.quantity - quantity;
                await basketDevice.update({quantity: resultQuantity})
                // reload basket instance with given basketDevices
                await basket.reload({
                    include:
                        {
                            model: BasketDevice,
                            where: {basketId},
                            include: {
                                model: Device
                            }
                        },
                    order: [[BasketDevice, 'createdAt', 'desc']]
                })
                // remove
            } else {
                await basketDevice.destroy()
                // reload basket instance with removed basketDevices
                await basket.reload({
                    include:
                        {
                            model: BasketDevice,
                            include: Device
                        }
                })
            }
            // otherwise throw an error
        } else {
            return next(APIError.internalError(`No device with id: ${deviceId} in the basket with id: ${basketId}`))
        }

        return res.json(basket)
    }

    async removeItem(req, res, next) {
        const {basketId, deviceId} = req.body
        if (!basketId || !deviceId) {
            return next(APIError.badRequestError(`No basketId or deviceId was given!`))
        }
        const basket = await Basket.findOne({where: {id: basketId}})
        if (!basket) {
            return next(APIError.internalError(`Can't find basket by given id: ${basketId}`))
        }
        // if device is already in the cart
        let basketDevice = await BasketDevice.findOne({
            where: [{basketId: basketId, deviceId: deviceId}]
        })
        // otherwise let's add device with given id in the cart
        if (!basketDevice) {
            return next(APIError.internalError(`No device with id: ${deviceId} in the basket with id: ${basketId}`))
        } else {
            await basketDevice.destroy()
            // reload basket instance with removed basketDevices
            await basket.reload({
                include:
                    {
                        model: BasketDevice,
                        include: Device
                    }
            })
        }

        return res.json(basket)
    }
}

module.exports = new BasketController()
