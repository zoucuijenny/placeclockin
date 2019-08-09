import Vue from 'vue'
import Router from 'vue-router'

import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('data/')
import wxshare from '../store/modules/share.js'

Vue.use(Router)

const router=new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component:()=>import('@/components/index')
    },
    // {
    //   path: '/',
    //   name: 'index',
    //   component:()=>import('@/components/advanceVedio')
    // },
    {
      path: '/author',
      name: 'author',
      component:()=>import('@/components/Author')

    },
    {
      path:'/pictureClock',
      name:'pictureClock',
      component:()=>import('@/components/pictureClock')
    },
    {
      path:'/ontheway',
      name:'ontheway',
      component:()=>import('@/components/ontheway')
    },
    {
      path:'/placeDetail/:placeId',
      name:'placeDetail',
      component:()=>import('@/components/placeDetail')
    },
    {
      path:'/postStation',
      name:'postStation',
      component:()=>import('@/components/postStation')
    },
    {
      path:'/reward',
      name:'reward',
      component:()=>import('@/components/reward')
    },
    {
      path:'/album/ :place',
      name:'album',
      component:()=>import('@/components/album')
    }
  ]
})
// router.beforeEach((to,from,next)=>{
//   wxshare.successfulShare(to.query)
//   console.log(to)
//   //第一次进入项目
//   if(!localStorage.getItem('userId') && to.path !=='/author'){
//     //保存用户进入的url
//     localStorage.setItem('beforeLoginUrl',to.params)
//     next('/author')
//     return false
//   }
//   next()
// })
export default router
