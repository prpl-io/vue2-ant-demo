class PathService {
    constructor(path) {
        this.path = path;
    }

    getTempPath() {
        return this.path.join(__dirname, '../../storage/temp');
    }
}

module.exports = PathService;
