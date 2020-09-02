import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import Amplify from 'aws-amplify';
import {cognitoConfig} from './awsConfig/aws-cognito';
Amplify.configure({
  Auth: cognitoConfig
});
Vue.config.productionTip = false
var VueCookie = require('vue-cookie');
// Tell Vue to use the plugin
Vue.use(VueCookie);
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
