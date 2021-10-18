const { StatusCodes: HTTP } = require('http-status-codes');

class StoreController {
    constructor(storeHandler, cache) {
        this.storeHandler = storeHandler;
        this.cache = cache;
    }

    async invoke(request, response) {
        const { body: userData } = request;

        const user = await this.storeHandler.handle(userData);

        return response.status(HTTP.CREATED).send(user);
    }
}

module.exports = StoreController;
