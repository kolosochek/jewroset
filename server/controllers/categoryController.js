const { Category } = require('../models')
const APIError = require('../error/APIError')

class CategoryController {
    async create(req, res){
        const {name} = req.body
        const category = await Category.create()
        return res.json(category)
    }

    async get(req, res){
        
    }
}

module.exports = new CategoryController()
