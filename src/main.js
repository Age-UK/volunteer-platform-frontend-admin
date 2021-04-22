import { createApp } from 'vue/dist/vue.esm-bundler';
import App from './App.vue';
import router from './router';
import store from './store';
import * as services from './services';
import language from './language';
import { defineRule } from 'vee-validate';
import AllRules from '@vee-validate/rules';
import VueSvgInlinePlugin from 'vue-svg-inline-plugin';
import VueFeather from 'vue-feather';

Object.keys(AllRules).forEach(rule => {
  defineRule(rule, AllRules[rule]);
});

services.auth.setUserIfAuthenticated();

const app = createApp(App)
  .use(store)
  .use(router)
  .use(VueSvgInlinePlugin)
  .component(VueFeather.name, VueFeather);

app.config.globalProperties.$services = services;
app.config.globalProperties.$language = language;

app.config.globalProperties.$appGlobals = {
  orgName: process.env.VUE_APP_ORG_NAME,
  perPage: 10,
  dateFormat: 'dd/MM/yyyy, hh:mm aa',
  statuses: [
    {
      name: 'Pending',
      value: 'Pending',
    },
    {
      name: 'Leaving service',
      value: 'LeaveService',
    },
  ],
};

app.mount('#app');
