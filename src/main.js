import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/mdbvue.css'
import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  useEslint: false,
  render: h => h(App)
}).$mount('#app')
