import Vue from 'vue';
import App from './App';
import router from './router';
import store from './state/store';
import config from './config';

require('./bootstrap/axios.config');
require('./bootstrap/di');
require('./bootstrap/global-components');
require('./bootstrap/global-filters');
require('./bootstrap/global-styles');
require('./bootstrap/plugins');

Vue.config.productionTip = config.env === 'production';

new Vue({
    router,
    store,
    publicPath: config.publicPath,
    render: h => h(App)
}).$mount('#app');
