const util = require('util');

module.exports = object => {
    const stringifiedObject = util.inspect(object, { showHidden: false, depth: null });

    return Buffer.from(stringifiedObject).toString('base64');
};
