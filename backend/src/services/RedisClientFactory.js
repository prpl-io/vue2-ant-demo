class RedisClientFactory {
    static create(redis, redisConfig) {
        const redisClient = redis.createClient(redisConfig);
        redisClient.unref();

        const id = Math.random().toString(36).substring(2);
        console.log(`Redis client instance created #ID ${id}`);

        return redisClient;
    }
}

module.exports = RedisClientFactory;
