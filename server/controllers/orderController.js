const APIError = require('../error/APIError')
const {Basket, Device, BasketDevice, Order} = require('../models/models')
const {add} = require("nodemon/lib/rules");


class OrderController {

    /*
    include: [
        {
            model: Basket,
            where: {id: basketId},
            include: Device,
            order: ['createdAt'],
        }
    ]
     */
    async createOrder(req, res) {
        const {userId, basketId, address, address2, country, city, zip, status} = req.body.orderObj;
        const order = await Order.create({
            userId: userId,
            basketId: basketId,
            addressone: address,
            addresstwo: address2,
            country: country,
            city: city,
            zip: zip,
            status: status ? status : 'created'
        })
        return res.json(order)
    }
}

module.exports = new OrderController()
