const { buildCheckFunction } = require('express-validator');

const files = buildCheckFunction(['files']);

module.exports = [
    files('csvFile')
        .notEmpty()
        .withMessage((value, { req }) => req.__('csvToJson.validators.csvFileRequired')),

    files('csvFile.mimetype')
        .isIn(['text/csv'])
        .withMessage((value, { req }) => req.__('csvToJson.validators.incorrectCsv'))
];
