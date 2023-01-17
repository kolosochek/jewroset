const APIError = require('../error/APIError')
const {Basket, Device, BasketDevice, Order, User} = require('../models/models')


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
    async createOrder(req, res, next) {
        const {userId, basketId, addressone, addresstwo, country, city, zip, status} = req.body.orderObj;
        const order = await Order.create({
            userId: userId,
            basketId: basketId,
            addressone: addressone,
            addresstwo: addresstwo,
            country: country,
            city: city,
            zip: zip,
            status: status ? status : 'created'
        }, {
            include: [
                {
                    model: Basket,
                }
            ]
        })
        if (!order) {
            return next(APIError.internalError(`Can't create an order with giver params! ${req.body.orderObj.toString()}`))
        }
        return res.json(order)
    }

    async getOrders(req, res, next) {
        const {userId} = req.body;
        const order = await Order.findAndCountAll({
            where: {
                userId: userId,
            }, include: [
                {
                    model: Basket,
                    where: {status: 'closed'},
                    include: [{
                        model: BasketDevice,
                        order: ['createdAt'],
                        include: Device
                    }]
                }
            ],
            order: [['createdAt', 'desc']]
        })
        if (!order) {
            return next(APIError.internalError(`Can't create an order with giver params! ${req.body.orderObj.toString()}`))
        }
        return res.json(order.rows)
    }

    async adminGetAll(req, res, next) {
        if (!(req.user && req.user.role === "ADMIN")){
            return next(APIError.internalError(`User is not ADMIN!`))
        }
        let {userId, limit, page, orderBy, orderDirection} = req.query;
        page = page || 1
        limit = limit || 10
        let offset = page * limit - limit
        // find user instance
        const user = await User.findOne({
            where: {
                id: userId
            }
        })
        if (!user){
            return next(APIError.internalError(`User with id: ${userId} is not found!`))
        }
        // and check admin role
        if (user.role !== "ADMIN"){
            return next(APIError.internalError(`User with id: ${userId} have no admin role!`))
        }

        // get all orders
        const order = await Order.findAndCountAll({
            include: [
                {
                    model: Basket,
                    include: [{
                        model: BasketDevice,
                        order: [['id', 'asc']],
                        include: Device
                    }]
                },
                {
                    model: User,
                }
            ],
            order: [[orderBy, orderDirection]],
            limit,
            offset
        })
        if (!order) {
            return next(APIError.internalError(`Can't create an order with given params! ${req.body.orderObj.toString()}`))
        }
        return res.json(order)
    }

    async adminRemoveOrder(req, res, next) {
        if (!(req.user && req.user.role === "ADMIN")){
            return next(APIError.internalError(`User is not ADMIN!`))
        }
        const {userId, orderId} = req.body.params;
        // find user instance
        const user = await User.findOne({
            where: {
                id: userId
            }
        })
        if (!user){
            return next(APIError.internalError(`User with id: ${userId} is not found!`))
        }
        // and check admin role
        if (user.role !== "ADMIN"){
            return next(APIError.internalError(`User with id: ${userId} have no admin role!`))
        }
        // get all orders
        const order = await Order.findOne({
            where: {
                id: orderId
            }
        })
        if (!order) {
            return next(APIError.internalError(`Can't find an order with id: ${orderId}`))
        }
        await order.destroy()
        return res.json({result: true})
    }

    async adminUpdateOrder(req, res, next) {
        if (!(req.user && req.user.role === "ADMIN")){
            return next(APIError.internalError(`User is not ADMIN!`))
        }
        const {email, userId, id, addressone, addresstwo, country, city, zip, status} = req.body.orderObj;
        // find user instance
        const user = await User.findOne({
            where: {
                id: userId,
            }
        })
        if (!user){
            return next(APIError.internalError(`User with id: ${userId} or email: ${email} is not found!`))
        }
        // and check admin role
        if (user.role !== "ADMIN"){
            return next(APIError.internalError(`User with id: ${userId} have no admin role!`))
        }
        const order = await Order.findOne({
            where: {
                id: id
            }
        })
        if (!order) {
            return next(APIError.internalError(`Can't create an order with giver params! ${req.body.orderObj.toString()}`))
        }
        const updatedOrder = await order.update({
            userId: userId,
            addressone: addressone,
            addresstwo: addresstwo,
            country: country,
            city: city,
            zip: zip,
            status: status ? status : 'created'
        }, {
            include: [
                {
                    model: Basket,
                }
            ]
        })
        return res.json(updatedOrder)
    }
}

module.exports = new OrderController()
