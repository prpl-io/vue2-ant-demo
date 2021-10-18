const fs = require('fs');
const camelCase = require('lodash/camelCase');

const validators = {};
const files = fs.readdirSync(__dirname);

for (const file of files) {
    const [fileName] = file.split('.');

    if (fileName === 'index') {
        continue;
    }

    validators[camelCase(fileName)] = require(`./${fileName}`);
}

module.exports = validators;
