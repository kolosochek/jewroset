const { Category} = require('../models/models')
const APIError = require('../error/APIError')


class CategoryController {
    async adminCreateCategory(req, res) {
        const {name} = req.body.categoryObj
        const category = await Category.create({name})
        return res.json(category)
    }

    async adminUpdateCategory(req, res, next) {
        const {name} = req.body.categoryObj
        const category = await Category.findOne({where: {name}})
        if (!category) {
            return next(APIError.badRequestError(`Can't find category by name: ${category}`))
        }
        return res.json(category)
    }

    async adminRemoveCategory(req, res, next) {
        const {categoryId} = req.body.params;

        // get all orders
        const category = await Category.findOne({
            where: {
                id: categoryId
            }
        })
        if (!category) {
            return next(APIError.internalError(`Can't find category with id: ${categoryId}`))
        }
        await category.destroy()
        return res.json({result: true})
    }

    async getAll(req, res){
        const categories = await Category.findAll()
        return res.json(categories)
    }

    async getById(req, res){
        const {categoryId} = req.query
        const category = await Category.findOne({where:{categoryId}})
        return res.json(category)
    }
}

module.exports = new CategoryController()
