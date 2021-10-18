class Publisher {
    constructor(channel, name) {
        this.channel = channel;
        this.name = name;
        const iid = Math.random().toString(36).substring(2);
        console.log(`Publisher ${name} instance created #ID ${iid}`);
    }

    publish(message) {
        console.log(`${this.name}Publisher: message published ...`);

        Promise.resolve(this.channel).then(async channel => {
            await this._publish(channel, message);
        });
    }

    async _publish(channel, message) {
        await channel.sendToQueue(
            this.name,
            Buffer.from(JSON.stringify(message))
        );
    }
}

module.exports = Publisher;
