import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import { errorHandler } from "@/utils"

import "@/plugins/vuelidate"
import "@/plugins/mdb"

Vue.config.productionTip = false
Vue.config.errorHandler = errorHandler

new Vue({
  router,
  store,
  useEslint: false,
  render: h => h(App)
}).$mount('#app')
