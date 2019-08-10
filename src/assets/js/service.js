
import wx from 'weixin-js-sdk'
import axios from 'axios'
import Vue from 'vue'
 import promise from 'promise'

const appId = 'wx2b0cfb496537a3dc'//后台提供
const address='http://www.zss001.cn/'

const prefix = process.env.NODB_BNV === 'development'
  ? address
  : address

axios.defaults.withCredentials=true
axios.defaults.headers={'Content-Type': 'application/json' }

const request=axios.create({
  baseURL:prefix,
  headers:{'Content-Type': 'application/json','token':localStorage.getItem('userId') },
  withCredentials:true
})

//http request 请求拦截器，有ppId值则配置上ppId值
request.interceptors.request.use(config => {
  // let token = sessionStorage.getItem('userId')
  // console.log('当前userId=='+token)
  // let defaultParams={
  //   token:token
  // }
  //   config.data = Object.assign(defaultParams,config.data)
  //   console.log('头部参数+'+JSON.stringify( config.data))
  return config
},
    err => Promise.reject(err)
)
request.interceptors.response.use(response=>{
  if(response.data.status===403){
    //let beforeUrl='http://www.baltictravellerservice.com'
    let beforeUrl=address
    beforeUrl=encodeURIComponent(beforeUrl)
    let toWx=`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${beforeUrl}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirec`;
    window.location.href=toWx
  }
  return response;
},function (error) {
  return Promise.reject(error)
})

let fetch=function(){
  Vue.prototype.$axios=request
  Vue.prototype.$address=address
}


//微信 SDK 接口配置
// const sdkConfig=request.post('')
//   .then((res)=>{
//     if(res.data.state===0){
//       wx.config({
//         debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//         appId: '', // 必填，公众号的唯一标识
//         timestamp:'' , // 必填，生成签名的时间戳
//         nonceStr: '', // 必填，生成签名的随机串
//         signature: '',// 必填，签名
//         jsApiList: [] // 必填，需要使用的JS接口列表
//       });
//     }
export default {
  // sdkConfig,
  fetch
}
