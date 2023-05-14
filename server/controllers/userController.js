const APIError = require('../error/APIError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Basket } = require('../models/models')


const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id: id, email: email, role: role},
        process.env.SECRET,
        {expiresIn: '183d'}
    )
}
class UserController {
    async signup(req, res, next) {
        const {email, password, role} = req.body
        if (!email || !password) {
            return res.json({error: `No error or password was given!`})
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return res.json({error: `User with given email: ${email} already exist!`})

        }
        const passwordHash = await bcrypt.hash(password, 5)
        const user = await User.create({email: email, password:passwordHash, role: role})
        //const userId = user.id
        //const basket = await Basket.findOrCreate({where: {id:userId}})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async signin(req, res, next){
        const {email, password} = req.body
        if(!email || !password) {
            return res.json({error: `No email or password was given!`})
        }
        const user = await User.findOne({where: {email}})
        if (!user) {
            return res.json({error: `Can't find user by given email: ${email}`})
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword) {
            return next(APIError.badRequestError(`Wrong password!`))
        }
        const userId = user.id
        //const basket = await Basket.findOrCreate({where: {idd:userId}})
        const basket = await Basket.findOrCreate({where: {userId:userId}})
        if (!basket[0]){
            return res.json({error: `Can't find or creat basket for user with id: ${userId}`})
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
        const user = await User.findOne({where: {email: email}, attributes: ['id', 'phone', 'firstname', 'lastname']})
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
            userObj.firstname = firstName
        }
        if (lastName){
            userObj.lastname = lastName
        }
        // update user info
        user.update(userObj, {attributes: ['phone', 'firstname', 'lastname']})
        //
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async adminGetAll(req, res, next) {
        let {orderBy, orderDirection, limit, page} = req.query;
        page = page || 1
        limit = limit || 10
        let offset = page * limit - limit
        const options = {
            where: {},
            order: [['id', 'desc']],
            limit,
            offset
        }
        if (orderBy) {
            options.order = [[orderBy, orderDirection]]
        }
        const users = await User.findAndCountAll(options)
        if (!users){
            return next(APIError.internalError(`Can't get all users by admin request`))
        }
        return res.json(users)
    }

    async adminCreateUser(req, res, next) {
            const {email, password, role, firstname, lastname, phone} = req.body.userObj
            if (!email || !password) {
                return next(APIError.badRequestError(`No email or password was given!`))
            }
            const candidate = await User.findOne({where: {email}})
            if (candidate) {
                return next(APIError.badRequestError(`User with given email: ${email} already exist!`))
            }
            const passwordHash = await bcrypt.hash(password, 5)
            const userObj = {
                email: email,
                password: passwordHash,
                role: role,
                firstname: firstname,
                lastname: lastname,
                phone: phone
            }
            const user = await User.create(userObj)
            return res.json(user)
    }

    async adminUpdateUser(req, res, next) {
        const {email, password, role, firstname, lastname, phone} = req.body.userObj
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(APIError.badRequestError(`Can't find user with given email: ${email}`))
        }
        const userObj = {
            email: email,
            role: role,
            firstname: firstname,
            lastname: lastname,
            phone: phone
        }
        if (password) {
            userObj.password = await bcrypt.hash(password, 5)
        }

        const user = await User.update(userObj)
        return res.json(user)
    }
}

module.exports = new UserController()
