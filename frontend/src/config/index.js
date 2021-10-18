const env = (key, defaultValue = null) => process.env[key] || defaultValue;

const config = {
    projectName: 'containerTrackingApp',
    env: env('NODE_ENV'),
    url: env('VUE_APP_URL', 'http://127.0.0.1:8080'),
    port: env('VUE_APP_PORT', '8080'),
    publicPath: env('VUE_APP_PUBLIC_PATH', '/'),
    apiUrl: env('VUE_APP_API_URL', 'http://127.0.0.1:3001'),
    mediaUrl: env('VUE_APP_MEDIA_URL', 'http://127.0.0.1:3001/public'),
    frontendUrl: env('VUE_APP_FRONTEND_URL', 'http://127.0.0.1:3000'),
    tinymce: env('VUE_APP_TINYMCE')
};

module.exports = config;
