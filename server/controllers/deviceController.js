const uuid = require('uuid')
const path = require('path')
const {Device, DeviceInfo, Category, Brand, Basket} = require('../models/models')
const APIError = require('../error/APIError')

class DeviceController {
    async getAll(req, res) {
        let {brandId, categoryId, filterByType, filterByDirection, limit, page} = req.query;
        brandId = brandId === `0` ? undefined : brandId
        categoryId = categoryId === `0` ? undefined : categoryId
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        const options = {
            where: {},
            include: [
                {model: Category, attributes: ['id', 'name']},
                {model: Brand, attributes: ['id', 'name']},
                {model: DeviceInfo, as: 'info'}
            ],
            attributes: [
                'id', 'name', 'description', 'price', 'rating', 'img'
            ],
            order: [['id', 'desc']],
            limit,
            offset
        }

        if (!categoryId && brandId) {
            options.where = {brandId}
        }
        if (categoryId && !brandId) {
            options.where = {categoryId}
        }
        if (categoryId && brandId) {
            options.where = {categoryId, brandId}
        }
        if (filterByType) {
            options.order = [[filterByType, filterByDirection]]
        }
        const devices = await Device.findAndCountAll(options)
        return res.json(devices)
    }

    async getById(req, res) {
        // debug
        console.log(`req.params`)
        console.log(req.params)
        // 
        const {id} = req.params
        let device = await Device.findOne({
            where: {id},
            include: [
                {model: Category, attributes: ['id', 'name']},
                {model: Brand, attributes: ['id', 'name']},
                {model: DeviceInfo, as: 'info'}
            ],
            attributes: [
                'id', 'name', 'description', 'price', 'rating', 'img'
            ],
        });
        return res.json(device)
    }

    async adminGetAll(req, res) {
        let {brandId, categoryId, orderBy, orderDirection, limit, page} = req.query;
        brandId = brandId === `0` ? undefined : brandId
        categoryId = categoryId === `0` ? undefined : categoryId
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        const options = {
            where: {},
            include: [
                {model: Category, attributes: ['id', 'name']},
                {model: Brand, attributes: ['id', 'name']},
                {model: DeviceInfo, as: 'info'}
            ],
            attributes: [
                'id', 'name', 'description', 'price', 'rating', 'img'
            ],
            order: [['id', 'desc']],
            limit,
            offset
        }

        if (!categoryId && brandId) {
            options.where = {brandId}
        }
        if (categoryId && !brandId) {
            options.where = {categoryId}
        }
        if (categoryId && brandId) {
            options.where = {categoryId, brandId}
        }
        if (orderBy) {
            options.order = [[orderBy, orderDirection]]
        }
        const devices = await Device.findAndCountAll(options)
        return res.json(devices)
    }

    async adminCreateDevice(req, res, next) {
        try {
            let {name, description, price, rating, brandId, categoryId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({name, description, price, rating, brandId, categoryId, img: fileName});

            if (info) {
                info = JSON.parse(info)
                info.forEach(item => {
                    DeviceInfo.create({
                        title: item.title,
                        description: item.description,
                        deviceId: device.id,
                    })
                })
            }
            return res.json(device)
        } catch (e) {
            next(APIError.badRequestError(e.message))
        }
    }

    async adminRemoveDevice(req, res, next) {
        const {deviceId} = req.body.params;

        // get all orders
        const device = await Device.findOne({
            where: {
                id: deviceId
            }
        })
        if (!device) {
            return next(APIError.internalError(`Can't find an device with id: ${deviceId}`))
        }
        await device.destroy()
        return res.json({result: true})
    }

    async adminUpdateDevice(req, res, next) {
        // debug
        console.log(`req.body`)
        console.log(req.body)
        console.log(`req.files.img`)
        console.log(req.files.img)
        // 
        try {
            let {deviceId, name, description, price, rating, brandId, categoryId, info, img} = req.body
            const deviceObj = {
                categoryId: categoryId,
                brandId: brandId,
                name: name,
                description: description,
                price: price,
                rating: rating,
            }

            if (req.files.img) {
                const {img} = req.files
                let fileName = uuid.v4() + ".jpg"
                img.mv(path.resolve(__dirname, '..', 'static', fileName))
                deviceObj.img = fileName
            }

            const device = await Device.findOne({
                where: {
                    id: deviceId
                }
            })
            if (!device) {
                return next(APIError.internalError(`Can't find a device with giver params! ${req.body.toString()}`))
            }
            if (info) {
                info = JSON.parse(info)
                info.forEach(item => {
                    DeviceInfo.findOrCreate({
                        where: {
                            title: item.title,
                            description: item.description,
                            deviceId: device.id,
                        }
                    })
                })
            }
            const updatedDevice = await device.update(deviceObj)
            return res.json(updatedDevice)
        } catch (e) {
            next(APIError.badRequestError(e.message))
        }
    }

}

module.exports = new DeviceController()
