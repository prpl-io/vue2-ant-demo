const app = require('../index');
const config = require('../config');

process.on('SIGINT', status => shutdown(status));
process.on('SIGTERM', status => shutdown(status));
process.on('exit', status => shutdown(status));

const httpServer = app.listen(config.app.port, () => {
    console.log(`Http server is listening on port: ${config.app.port}`);
});

async function shutdown(status = 0) {
    const di = app.get('di');

    try {
        console.log('Shutting down cache redis connection ...');
        const redisCacheClient = await di.get('redisCacheClient');
        await redisCacheClient.quit();
    } catch (e) {
        console.error(
            'There was an error during shutting down redis connection!'
        );
    }

    try {
        console.log('Shutting down session redis connection ...');
        const redisSessionClient = await di.get('redisSessionClient');
        await redisSessionClient.quit();
    } catch (e) {
        console.error(
            'There was an error during shutting down redis connection!'
        );
    }

    try {
        console.log('Shutting down RabbitMQ connection ...');
        const queueConnection = await di.get('queues.connection');
        await queueConnection.close();
    } catch (e) {
        console.error(
            'There was an error during shutting down queue connection!'
        );
    }

    try {
        console.log('Shutting down sequelize connection ...');
        const { sequelize } = await di.get('sequelize');
        await sequelize.close();
    } catch (e) {
        console.error(
            'There was an error during shutting down sequelize connection!'
        );
    }

    try {
        console.log('Shutting down http server ...');
        httpServer.close();
    } catch (e) {
        console.error('There was an error during shutting down http server!');
    }

    process.exit(status);
}
