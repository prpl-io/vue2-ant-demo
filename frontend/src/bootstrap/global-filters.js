import Vue from 'vue';
import dateOnly from '@/filters/dateOnly';
import formatDate from '@/filters/formatDate';
import startCase from '@/filters/startCase';
import formatPrice from '@/filters/formatPrice';
import truncate from '@/filters/truncate';

Vue.filter('dateOnly', dateOnly);
Vue.filter('formatDate', formatDate);
Vue.filter('startCase', startCase);
Vue.filter('formatPrice', formatPrice);
Vue.filter('truncate', truncate);
