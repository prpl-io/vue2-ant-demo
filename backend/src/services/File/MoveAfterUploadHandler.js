const createDirectory = require('../../helpers/createDirectory');

class FileMoveAfterUploadHandler {
    constructor(fs, pathService) {
        this.fs = fs.promises;
        this.pathService = pathService;
    }

    async handle(file) {
        const csvDir = this.pathService.getTempPath();

        await createDirectory(csvDir);

        const csvFileNamePath = `${csvDir}/file-${new Date().getTime()}.csv`;

        await file.mv(csvFileNamePath);

        return csvFileNamePath;
    }
}

module.exports = FileMoveAfterUploadHandler;
