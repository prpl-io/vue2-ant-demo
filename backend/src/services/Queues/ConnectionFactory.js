class ConnectionFactory {
    static async create(amqlib, rabbitMqConfig) {
        const connection = await amqlib.connect(rabbitMqConfig.url);

        const id = Math.random().toString(36).substring(2);
        console.log(`Queue connection instance created #ID ${id}`);

        return connection;
    }
}

module.exports = ConnectionFactory;
