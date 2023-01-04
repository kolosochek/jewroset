const APIError = require('../error/APIError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Basket } = require('../models/models')


const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id: id, email: email, role: role},
        process.env.SECRET,
        {expiresIn: '24h'}
    )
}
class UserController {
    async signup(req, res, next) {
        const {email, password, role} = req.body
        if (!email || !password) {
            return next(APIError.badRequestError(`No error or password was given!`))
        }
        const candidate = await User.findOne({where: {email}})

        if (candidate) {
            return next(APIError.badRequestError(`User with given email: ${email} already exist!`))
        }
        const passwordHash = await bcrypt.hash(password, 5)
        const user = await User.create({email: email, password:passwordHash, role: role})
        const userId = user.id
        const basket = await Basket.findOrCreate({where: {userId}})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async signin(req, res, next){
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
        const userId = user.id
        const basket = await Basket.findOrCreate({where: {userId}})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async findOrCreateGuest(req, res, next) {
        const {email, password, role} = req.body
        if (!email || !password) {
            return next(APIError.badRequestError(`No error or password was given!`))
        }
        const candidate = await User.findOne({where: {email}})

        if (candidate) {
            return next(APIError.badRequestError(`User with given email: ${email} already exist!`))
        }
        const passwordHash = await bcrypt.hash(password, 5)
        let user = await User.findOrCreate({where: {email: email, password:passwordHash, role: role}})
        user = user[0].dataValues
        // debug
        console.log(`user.email`)
        console.log(user.email)
        //
        const userId = user.id
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async isAuthorized(req, res, next){
        if (req.user && req.user.role !== 'GUEST') {
            const token = generateJwt(req.user.id, req.user.email, req.user.role)
            return res.json({token})
        } else {
            next(APIError.userNotAuthorizedError(`User is not authorized`))
        }
    }
}

module.exports = new UserController()
