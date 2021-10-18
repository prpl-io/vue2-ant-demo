import Vue from 'vue';
import GetValidationErrorMessageHandler from '@/services/GetValidationErrorMessageHandler';

Vue.prototype.$getValidationErrorMessageHandler = new GetValidationErrorMessageHandler();
