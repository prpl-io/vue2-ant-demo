const fs = require('fs').promises;
const isDirectory = require('./isDirectory');

module.exports = async path => {
    if (!(await isDirectory(path))) {
        await fs.mkdir(path, { recursive: true });
    }
};
