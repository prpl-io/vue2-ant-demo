module.exports = {
    services: {
        'services.file.moveAfterUploadHandler': {
            class: 'services/File/MoveAfterUploadHandler',
            arguments: ['%fs', '@pathService']
        },
        'service.file.createStreamHandler': {
            class: 'services/CsvImport/CreateStreamHandler',
            arguments: ['%fs', '%csv-parser', '%lodash/camelCase']
        }
    }
};
