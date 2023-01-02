const uuid = require('uuid')
const path = require('path')
const { Device, DeviceInfo, Category} = require('../models/models')
const APIError = require('../error/APIError')

class DeviceController {
    async create(req, res, next){
        try {
            let {name, price, brandId, categoryId, info} = req.body
            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({name, price, brandId, categoryId, img: fileName});

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

    async getAll(req, res){
        let {brandId, categoryId, limit, page} = req.query;

        //const {query} = req.params
        //const requestParams = query.split(':')
        //const [categoryId, brandId] = requestParams
        //let device = await Device.findAndCountAll({where:{categoryId, brandId}})
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit
        let devices;
        if(!brandId && !categoryId){
            devices = await Device.findAndCountAll({limit, offset})
        }
        if(brandId && !categoryId){
            devices = await Device.findAndCountAll({where:{brandId}, limit, offset})
        }
        if(!brandId && categoryId){
            devices = await Device.findAndCountAll({where:{categoryId}, limit, offset})
        }
        if(brandId && categoryId){
            devices = await Device.findAndCountAll({where:{categoryId, brandId}, limit, offset})
        }
        return res.json(devices)
    }

    async getById(req, res){
        const {id} = req.params
        let device = await Device.findOne({
            where: {id},
            include: [{model: DeviceInfo, as: 'info'}]
        });
        return res.json(device)
    }

    async getByCategory(req, res){
        const {id, categoryId = +id } = req.params
        let device = await Device.findAndCountAll({
            where: {
                categoryId: categoryId
            },
            include: [{model: DeviceInfo, as: 'info'}, {model: Category, as: 'categories'}]
        });
        return res.json(device)
    }
    async getByBrand(req, res){
        const {id, brandId = +id } = req.params
        let device = await Device.findAndCountAll({
            where: {
                brandId: brandId
            },
            include: [{model: DeviceInfo, as: 'info'}]
        });
        return res.json(device)
    }

    async getByCategoryBrand(req, res){
        const {query} = req.params
        const requestParams = query.split(':')
        const [categoryId, brandId] = requestParams
        let device = await Device.findAndCountAll({where:{categoryId, brandId}})
        return res.json(device)
    }
}

module.exports = new DeviceController()
