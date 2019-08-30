import Vue from 'vue'
import Router from 'vue-router'

import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('data/')
import  parse  from 'query-string';
import axios from "axios/index";
let prex='http://www.baltictravellerservice.com/'

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
let environment=true
if(environment){
  router.beforeEach((to,from,next)=>{
    //第一次进入项目
    //console.log('第一次进入项目from='+JSON.stringify(from))
    //《分享被点击后加明信片数量开始》
     let beforeUrl=to.path
    localStorage.setItem('beforeUrl',beforeUrl)  //值为/
     console.log('第一次进入项目wlf='+window.location.href)
      let params=window.location.search
      let beforUserId = parse.parse(params).beforUserId
      if(params){
        if(beforUserId){
          console.log('即将发送分享成功请求')
          localStorage.setItem('beforUserId',beforUserId)
            axios.get(prex+ 'api/share/sucess?beforUserId='+trim(beforUserId))
              .then(function (data){
                if (data.status === 0) {
                  console.log("加次数成功")
                  //未授权的用户进入授权页面
                  if(!sessionStorage.getItem('userId') && to.path !=='/author'){
                    next('/author')
                    return false
                  }
                  next()
                } else {
                  console.log(data.msg)
                  //未授权的用户进入授权页面
                  if(!sessionStorage.getItem('userId') && to.path !=='/author'){
                    next('/author')
                    return false
                  }
                  next()
                }
              })
              .catch(function(error){
                console.log(error)
                //未授权的用户进入授权页面
                if(!sessionStorage.getItem('userId') && to.path !=='/author'){
                  next('/author')
                  return false
                }
                next()
              })
          }else{
          //未授权的用户进入授权页面
          if(!sessionStorage.getItem('userId') && to.path !=='/author'){
            next('/author')
            return false
          }
          next()
        }
      }else{
        //未授权的用户进入授权页面
        if(!sessionStorage.getItem('userId') && to.path !=='/author'){
          next('/author')
          return false
        }
        next()
      }
//《分享被点击后加明信片数量结束》
  })
}

function trim(s){
  return s.replace(/(^\s*)|(\s*$)/g, "");
}
export default router
