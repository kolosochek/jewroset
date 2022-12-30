const APIError = require('../error/APIError')
const jwt = require('jsonwebtoken')

module.exports = function (role) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next(APIError.badRequestError(`Bad request method`))
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return next(APIError.userNotAuthorizedError(`CheckRoleMiddleWare try: User is NOT authorized!`))
            }
            const decoded = jwt.verify(token, process.env.SECRET)
            if (decoded.role.toUpperCase() !== role.toUpperCase()) {
                return next(APIError.badRequestError(`User with given role: ${role} is not permitted to make this action!`))
            }
            req.user = decoded
            next()
        } catch (e) {
            next(APIError.userNotAuthorizedError(`CheckRoleMiddleWare catch: User is NOT authorized!`))
        }
    }
}