const cors = require('cors');
const config = require('../config');

module.exports = app => {
    const corsSites = config.app.corsSites.split(',').map(site => site.trim());
    const originsWhitelist = [
        config.app.url,
        config.app.frontendUrl,
        ...corsSites
    ];
    const corsOptions = {
        origin(origin, callback) {
            if (originsWhitelist.includes(origin) || !origin) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
        exposedHeaders: ['cluid', 'xsrf-token', 'campus-id']
    };

    app.use(cors(corsOptions));
};
