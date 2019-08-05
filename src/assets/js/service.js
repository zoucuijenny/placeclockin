import request from 'request'
import wx from 'weixin-js-sdk'
import axios from 'axios'
 import promise from 'promise'

const prefix = process.env.NODB_BNV === 'development'
  ? 'http://122.112.221.15:9900'
  :'http://122.112.221.15:9900'

axios.defaults.withCredentials=true
axios.defaults.headers={'Content-Type': 'application/json' }
//setHeader("Access-Control-Allow-Origin
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
//   })
//   .catch((err)=>{
//     console.log(err)
//   })

//test登录
let testLogin=  axios.get(prefix+'/api/test/login',{})
  .then((res)=>{return res.data})
  .catch((err)=>{console.log(err)})
//正式登录
let login = function(code){
  axios.post(prefix+'/api/wx/login',{code:code })
    .then((res)=>{return res.data})
    .catch((err)=>{console.log(err)})
}

//长图打卡相关api
const clockIn={
 // 获取打卡情况
 async list(){
    let result={}
    await axios.get(prefix + '/api/placeInfo',{})
      .then((res)=>{
        result=res.data
      })
      .catch((err)=>{console.log(err)})
      return result

},
  //完成打卡
  async clock(placeId){
    let result = {}
    await axios.post(prefix+'/api/punch',{'place':placeId, 'status':1})
      .then((res)=>{
       result = res.data
      })
      .catch((err)=>{
        console.log(err)
      })
    return result
  }
}
const card={
  //查询明信片详情
  async cardInfo(){
    let result = {}
    await axios.get(prefix+'/api/cardInfo',)
      .then((res)=>{
        result = res.data
      })
      .catch((err)=>{
        console.log(err)
      })
    return result
  },
  //寄出明信片
async postCard(){
  let result = {}
  await axios.post(prefix+'/api/sendCard',)
    .then((res)=>{
      result = res.data
    })
    .catch((err)=>{
      console.log(err)
    })
  return result
},
}
export default {
  // sdkConfig,
  clockIn,
  testLogin,
  login,
  card
}
