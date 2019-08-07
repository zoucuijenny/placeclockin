<template>
  <div class="author">
  </div>
</template>

<script>
  export default {
    data() {
      return {
        webUrl: ''
      }
    },
    methods: {
      wxlogin: function (code) {
        let me = this
        me.$axios.post('/api/wx/login', { code: code })
          .then((res) => {
            console.log('登录返回结果：' + JSON.stringify(res))
            if (res.data.status === 0) {
              localStorage.setItem('userId', res.data.data.openid)
              let backurl = 'http://www.baltictravellerservice.com/#/'
              //window.location.href=localStorage.getItem('beforeLoginUrl')
              window.location.href = backurl
            } else {
              me.$toast.fail(res.data.msg);
              // window.location.href = me.webUrl;
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    created: function () {
      //首先在路由导航那里，判断用户是否登录，用户未登录，则进入本页
      let me = this
      let str = window.location.search
      let arr = str.split('\&')
      let codeIndex = arr[0].indexOf("\=");
      let code = str.substring(codeIndex + 1, arr[0].length);
      console.log('code==' + code)
      let userId = localStorage.getItem('userId')
      //检测用户是否登录
      if (userId) {
        me.$router.push({ name: 'index' })
        return
      }
      if (!code) {
        let url = window.location.href
        url = encodeURIComponent(url);
        const appId = 'wx2b0cfb496537a3dc'//后台提供
        me.webUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${url}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirec`;
        window.location.href = me.webUrl;
      } else {
        me.wxlogin(code)
      }
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
