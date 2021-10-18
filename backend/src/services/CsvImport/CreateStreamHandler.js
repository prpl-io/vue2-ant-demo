class CreateStreamHandler {
    constructor(fs, csvParser, camelCase) {
        this.fs = fs;
        this.csvParser = csvParser;
        this.camelCase = camelCase;
    }

    handle(filePath) {
        return this._iterate(this._getStream(filePath));
    }

    _getStream(filePath) {
        return this.fs.createReadStream(filePath, { encoding: 'utf8' }).pipe(
            this.csvParser({
                separator: ';',
                mapHeaders: ({ header }) => this.camelCase(header)
            })
        );
    }

    async *_iterate(source) {
        for await (const chunk of source) {
            yield chunk;
        }
    }
}

module.exports = CreateStreamHandler;
