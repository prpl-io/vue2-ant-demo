import Vue from 'vue';
import dayjs from 'dayjs';
import Vuelidate from 'vuelidate';
import Antd from 'ant-design-vue';

import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

Vue.use(Vuelidate);

Vue.use(Antd);

Vue.prototype.$toaster = function(message, type = 'success') {
    this.$message[type](message);
};

Vue.prototype.$toasterError = function(message = null) {
    this.$message.error(message || 'Something went wrong');
};

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

Vue.prototype.$dayjs = dayjs;

Vue.prototype.$copyToClipboard = function(text) {
    const el = document.createElement('textarea');
    el.value = text;

    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');

    document.body.removeChild(el);

    this.$toaster('Copied to clipboard!', {
        title: 'Copied!'
    });
};
