// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible/flexible'
import store from './store'
import { Toast } from 'vant';
import  service from './assets/js/service'

Vue.use(Toast);
Vue.config.productionTip = false
service.fetch()


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
