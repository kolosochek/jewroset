const APIError = require('../error/APIError')
const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next(APIError.badRequestError(`Bad request method`))
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return next(APIError.userNotAuthorizedError(`authMiddleware try: User is NOT authorized!`))
        }
        const decoded = jwt.verify(token, process.env.SECRET)
        req.user = decoded
        next()
    } catch (e) {
        next(APIError.userNotAuthorizedError(`authMiddleware catch: User is NOT authorized! ${e}`))
    }
}