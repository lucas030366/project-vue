import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'

import '@fortawesome/fontawesome-free/css/all.min.css'
import '@/plugins/vuelidate'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbootstrap/css/mdb.min.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  useEslint: false,
  render: h => h(App)
}).$mount('#app')
