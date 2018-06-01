import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VeeValidate from 'vee-validate'
import { store } from './store'
import '@/components/_globals'
import auth from './auth'
import { uppercase, formatDate } from './filters'
import algolia from './plugins/algolia'
import './assets/sass/main.sass'

Vue.config.productionTip = false
Vue.use(VeeValidate)
Vue.use(algolia, {
  indexName: 'events',
  appId: '1HGPKC5X2P',
  searchApiKey: 'd9fc8bdd28d251cdcb16a831d4283a3a'
})

Vue.filter('uppercase', uppercase)
Vue.filter('format', formatDate)

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    auth.init(this)
  }
}).$mount('#app')
