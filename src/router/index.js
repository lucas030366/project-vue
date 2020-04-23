import Vue from 'vue'
import Router from 'vue-router'

import authRoutes from "@/modules/auth/router/index"
import DashboardRoutes from "@/modules/dashboard/router/index"

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...authRoutes,
    ...DashboardRoutes,
    {
      path: '',
      redirect: '/login'
    }
  ]
})
