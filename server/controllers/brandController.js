const { Brand } = require("../models/models");
const APIError = require('../error/APIError')

class BrandController {
    async create(req, res){
        const {name} = req.body
        const brand = await Brand.create({name})
        return res.json(brand)
    }

    async getAll(req, res){
        const brands = await Brand.findAll()
        return res.json(brands)
    }

    async getById(req, res){
    }
}

module.exports = new BrandController()
