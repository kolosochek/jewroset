const APIError = require('../error/APIError')
const {Basket, Device, BasketDevice, Order} = require('../models/models')


class OrderController {
    async getOrCreateOrder(req, res) {
        const {userId, basketId, formData} = req.body.params;
        // debug
        console.log(`req.body.params`)
        console.log(req.body.params)
        console.log(`formData`)
        console.log(formData)
        const orderStatus = 'created'
        const order = await Order.findOrCreate({
            where: {userId: userId, basketId: basketId, status: orderStatus}, include: [
                {
                    model: Basket,
                    where: {id: basketId},
                    include: Device,
                    order: ['createdAt'],
                }
            ]
        })
        return res.json(order[0])
    }
}

module.exports = new OrderController()
