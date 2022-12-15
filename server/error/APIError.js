class APIError extends Error {
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }

    static badRequestError(message){
        return new APIError(404, message)
    }

    static internalError(message){
        return new APIError(500, message)
    }

    static forbiddenError(message){
        return new APIError(403, message)
    }
}

module.exports = APIError
