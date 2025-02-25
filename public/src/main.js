import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import  './assets/css/global.less'
import router from './router'
import Vuex from 'vuex'
import 'es6-promise/auto'
import VueMask from 'v-mask'
import VueCarousel from 'vue-carousel';
import  { store }  from './store/store'

Vue.use(VueCarousel);


Vue.use(VueMask)


Vue.use(Vuex)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
