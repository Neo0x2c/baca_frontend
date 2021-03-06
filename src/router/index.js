import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home/index'
import category from '@/views/category/index'
import detail from '@/views/detail/index'
import mine from '@/views/mine/index'
import wallet from '@/views/mine/mywallet'
import login from '@/views/login/login'
import register from '@/views/login/register'

import inviter from '@/views/invite/inviter'
import invitee from '@/views/invite/invitee'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/category/:cate_id',
      name: 'category',
      component: category
    },
    {
      path: '/detail/:art_id',
      name: 'detail',
      component: detail
    },
    {
      path: '/mine',
      name: 'mine',
      component: mine
    },

    {
      path: '/wallet',
      name: 'wallet',
      component: wallet
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/register/:invitecode',
      name: 'register',
      component: register
    },
    {
      path: '/inviter',
      name: 'inviter',
      component: inviter
    },
    {
      path: '/invitee',
      name: 'invitee',
      component: invitee
    }
  ]
})

