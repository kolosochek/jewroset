const APIError = require('../error/APIError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Basket } = require('../models/models')


const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id: id, email: email, role: role},
        process.env.SECRET,
        {expiresIn: '3m'}
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
        const basket = await Basket.findOrCreate({where: {id:userId}})
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
        const basket = await Basket.findOrCreate({where: {id:userId}})
        if (!basket[0]){
            return next(APIError.internalError(`Can't find or creat basket for user with id: ${userId}`))
        }
        // update basket
        await basket[0].update({userId: userId})

        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async findUser(req, res, next){
        const {email} = req.body
        const user = await User.findOne({where: {email: email}})
        if (!user) {
            return next(APIError.internalError(`Can't find user by given email: ${email}`))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async findUserRaw(req, res, next){
        const {email} = req.body
        const user = await User.findOne({where: {email: email}})
        if (!user) {
            return next(APIError.internalError(`Can't find user by given email: ${email}`))
        }
        return res.json(user)
    }

    async isAuthorized(req, res, next){
        if (req.user) {
            const token = generateJwt(req.user.id, req.user.email, req.user.role)
            return res.json({token})
        } else {
            next(APIError.userNotAuthorizedError(`User is not authorized`))
        }
    }

    async updateUser(req, res, next){
        const {email, newEmail, password, phone, firstName, lastName, role} = req.body.userObj
        // debug
        console.log(`req.body.userObj`)
        console.log(req.body.userObj)
        //
        const userObj = {email: email}
        const user = await User.findOne({where: {email: email}})
        if (!user) {
            return next(APIError.internalError(`Can't find user by given email: ${email}`))
        }
        if (newEmail){
            userObj.email = newEmail
        }
        if (password){
            userObj.password = await bcrypt.hash(password, 5)
        }
        if (phone){
            userObj.phone = phone
        }
        if (role){
            userObj.role = role
        }
        if (firstName){
            userObj.firstName = firstName
        }
        if (lastName){
            userObj.lastName = lastName
        }
        // update user info
        user.update(userObj)
        //
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
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }
}

module.exports = new UserController()
