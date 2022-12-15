const APIError = require('../error/APIError')

class UserController {
    async signup(req, res){

    }

    async signin(req, res){
        
    }

    async isAuthorized(req, res, next){
        const {id} = req.query
        if (!id){
            return next(APIError.badRequestError(`No user id was given`))
        }
        res.status(200).json(id)
    }
}

module.exports = new UserController()
