const { Category } = require('../models/models')
const APIError = require('../error/APIError')


class CategoryController {
    async create(req, res){
        const {name} = req.body
        const category = await Category.create({name})
        return res.json(category)
    }

    async getAll(req, res){
        const categories = await Category.findAll()
        return res.json(categories)
    }

    async getById(req, res){
    }
}

module.exports = new CategoryController()
