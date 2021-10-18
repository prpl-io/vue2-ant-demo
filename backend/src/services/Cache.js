const { promisify } = require('util');

class Cache {
    /**
     * @param {RedisStore} redis
     * @param cacheConfig
     */
    constructor(redis, { keyExpiresInMinutes, enable }) {
        ['GET', 'SET', 'SETEX', 'DEL', 'EXISTS', 'SCAN'].forEach(
            method => (redis[method] = promisify(redis[method]))
        );

        this.redis = redis;
        this.keyExpiresInMinutes = keyExpiresInMinutes;
        this.enable = enable;
    }

    async get(key = null) {
        if (!key) {
            return null;
        }

        const result = await this.redis.GET(key);

        if (!result) {
            return null;
        }

        return JSON.parse(result);
    }

    set(key, value) {
        if (!this.enable) {
            return;
        }

        const jsonValue = JSON.stringify(value);

        if (this.keyExpiresInMinutes === 0) {
            return this.redis.SET(key, jsonValue);
        } else {
            return this.redis.SETEX(
                key,
                this.keyExpiresInMinutes * 60,
                jsonValue
            );
        }
    }

    forget(key) {
        return this.redis.DEL(key);
    }

    exists(key) {
        if (!this.enable) {
            return false;
        }

        return this.redis.EXISTS(key);
    }

    async _eachScan(pattern, eachScanCallback) {
        let matchingKeysCount = 0;

        const recursiveScan = async (mainCursor = 0) => {
            const [cursor, matchingKeys] = await this.redis.SCAN(
                mainCursor,
                'MATCH',
                pattern
            );

            matchingKeysCount += matchingKeys.length;
            eachScanCallback(matchingKeys);

            if (cursor === '0') {
                return matchingKeysCount;
            } else {
                return recursiveScan(cursor);
            }
        };

        return recursiveScan();
    }

    async runActionOnKeyPattern(pattern) {
        let keys = [];

        await this._eachScan(pattern, matchingKeys => {
            keys = keys.concat(matchingKeys);
        });

        return keys;
    }

    async forgetByPattern(pattern) {
        if (!this.enable) {
            return;
        }

        const keys = await this.runActionOnKeyPattern(pattern);

        for (const key of keys) {
            await this.forget(key);
        }
    }
}

module.exports = Cache;
