const {Brand} = require("../models/models");
const APIError = require('../error/APIError')

class BrandController {
    async adminCreateBrand(req, res) {
        const {name} = req.body.brandObj
        const brand = await Brand.create({name})
        return res.json(brand)
    }

    async adminUpdateBrand(req, res, next) {
        const {name} = req.body.brandObj
        const brand = await Brand.findOne({where: {name}})
        if (!brand) {
            return next(APIError.badRequestError(`Can't find brand by name: ${name}`))
        }
        return res.json(brand)
    }

    async getAll(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }

    async getById(req, res) {
    }
}

module.exports = new BrandController()
