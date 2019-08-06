<template>
  <div class="author">
  </div>
</template>

<script>
  import service from '../assets/js/service'
  export default {
    data() {
      return {
        webUrl:''
      }
    },
    methods:{
      wxlogin:function(code){
       let me=this
        let result=service.login(code)
        console.log('登录返回结果：'+result)
       if(result.status===0){
         localStorage.setItem('userId',result.data.openid)
         window.location.href=localStorage.getItem('beforeLoginUrl')
       }else{
         me.$toast.fail(result.msg);
         window.location.href = me.webUrl;
       }
      }
    },
    created:function(){
      //首先在路由导航那里，判断用户是否登录，用户未登录，则进入本页
      let me=this
      let str=window.location.search
      let  arr=str.split('\&')
      let codeIndex=arr[0].indexOf("\=");
      let code=str.substring(codeIndex+1,arr.length);
      console.log('code=='+code)
      let userId=localStorage.getItem('userId')
      //检测用户是否登录
      if(!userId){
        let url=encodeURIComponent(window.location.href);
        const appId='wx2b0cfb496537a3dc'//后台提供
        let ua = window.navigator.userAgent.toLowerCase()
      //  if(ua.match(/MicroMessenger/i) === 'micromessenger'){
          me.webUrl= `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=http%3A%2F%2Fapi.lvyy365.com%2Flogin%2FweixinLogin%3Fcallback%3D${url}&response_type=code&scope=snsapi_userinfo&state=state#wechat_redirect`;
       // }
        window.location.href = me.webUrl;
      }
     me.wxlogin(code)

    }
  }
</script>

<style lang="scss">
  .author {
    .topic {
      font-size: 24px;
      font-weight: bold;
      line-height: 1.1;
      margin-top: 25%;
      margin-bottom: 30%;
    }
    .welcome {
      font-size: 20px;
      line-height: 1.3;
      margin-bottom: 50%;
    }
  }


</style>
