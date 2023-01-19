const uuid = require('uuid')
const path = require('path')
const {Device, DeviceInfo, Category, Brand} = require('../models/models')
const APIError = require('../error/APIError')

class DeviceController {
    async create(req, res, next) {
        try {
            // debug
            console.log(`req.body`)
            console.log(req.body)
            //
            // debug
            console.log(`req.files`)
            console.log(req.files)
            //
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
                {model: Brand, attributes: ['id', 'name']}
            ],
            attributes: [
              'id', 'name', 'description', 'price', 'rating', 'img'
            ],
            order: [['createdAt', 'desc']],
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

}

module.exports = new DeviceController()
