class AbstractConsumer {
    constructor(channel, nameOrParams) {
        this.channel = channel;
        this.name =
            typeof nameOrParams === 'string' ? nameOrParams : nameOrParams.name;

        const id = Math.random().toString(36).substring(2);
        console.log(`Consumer #${this.name} instance created ID ${id}`);
    }

    consume(errorHandler = error => console.error(error)) {
        console.log(`Consumer #${this.name} started ...`);

        this.errorHandler = errorHandler;

        Promise.resolve(this.channel).then(channel => this._consume(channel));
    }

    _consume(channel) {
        channel.consume(this.name, message => this._work(channel, message));
    }

    async _work(channel, message) {
        if (!message.content) {
            throw new Error("Message doesn't contain content");
        }

        console.log(`Consumer #${this.name} consumed message ...`);

        try {
            const item = JSON.parse(message.content);
            await this._processing(item);
            await channel.ack(message);
        } catch (error) {
            await channel.reject(message, false);

            this.errorHandler(error);
        }
    }

    async _processing(item) {
        console.log(item);
    }
}

module.exports = AbstractConsumer;
