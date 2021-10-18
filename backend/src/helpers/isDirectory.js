const fs = require('fs').promises;

module.exports = async path => {
    try {
        return (await fs.lstat(path)).isDirectory();
    } catch (e) {
        return false;
    }
};
