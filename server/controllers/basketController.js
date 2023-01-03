const APIError = require('../error/APIError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')


const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id: id, email: email, role: role},
        process.env.SECRET,
        {expiresIn: '24h'}
    )
}
class BasketController {
    async getUserBasket(req, res) {
        let {userId} = req.query;
        const basket = await Basket.findOrCreate({where: {userId}})

        return res.json(basket)
    }

    async setUserBasket(req, res, next){
        const {email, password} = req.body
        if(!email || !password) {
            return next(APIError.badRequestError(`No email or password was given!`))
        }
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(APIError.internalError(`Can't find user by given email: ${email}`))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword) {
            return next(APIError.badRequestError(`Wrong password!`))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }
}

module.exports = new BasketController()
