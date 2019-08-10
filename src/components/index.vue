<template>
  <div class="hello">
    <img  class="bgimg" :src="indexbg">
    <img :src="logo" alt="" class="logo">
    <img class="indexTopic" :src="indexTopic">
    <img @click="toclock()" class="clockinBtn" :src="clockinBtn">
    <img @click="totheway()" class="onthewayBtn" :src="onthewayBtn">
    <audio  id="btnMusic">
      <source :src="btnMusic" type="audio/ogg" >
    </audio>
  </div>
</template>
<script>
  import indexbg from '../assets/images/p1bg.jpg'
  import logo from '../assets/images/logowhite.png'
  import onthewayBtn from '../assets/images/ontheway.png'
  import clockinBtn from '../assets/images/btnclockin.png'
  import indexTopic from '../assets/images/indexTopic.png'
  import btnMusic from '../assets/vedio/btnMusic.mp3'
 import wxshare from '../store/modules/share.js'

export default {
  data() {
    return {
      indexbg: indexbg,
      logo: logo,
      clockinBtn: clockinBtn,
      onthewayBtn: onthewayBtn,
      btnMusic: btnMusic,
      indexTopic: indexTopic
    }
  },
  methods: {
    isIPhone: function () {
      const uag = window.navigator.userAgent;
      let _isIPhone = true;
      if (uag.indexOf('Android') > -1 || uag.indexOf('Adr') > -1) {
        _isIPhone = false;
      }
      return _isIPhone;
    },
    totheway: function () {
      let me = this
      let myVideo = document.getElementById("btnMusic");
      myVideo.play();
      setTimeout(function () {
        me.$router.push({name: 'ontheway'})
      }, 300)
    },
    toclock: function () {
      let me = this
      let myVideo = document.getElementById("btnMusic");
      myVideo.play();
      setTimeout(function () {
        me.$router.push({name: 'pictureClock'})
        // window.location.href= '/pictureClock'
      }, 300)
    },
  },
  created: function () {
    let me = this
    let str = window.location.href
    // console.log('地址问号后字符串'+str.indexOf('\?'))
    //console.log('window.location.href 地址'+str)
    if (str.indexOf('\?') !== -1) {
      str = window.location.search
      let arr = str.split('\&')
      let codeIndex = arr[0].indexOf("\=");
      let code = str.substring(codeIndex + 1, arr[0].length);
      // console.log('code值'+code)
      if (code) {
        me.$axios.post('/api/wx/login', {code: code})
          .then((res) => {
            console.log('登录返回结果：' + JSON.stringify(res))
            if (res.data.status === 0) {
              sessionStorage.setItem('userId', res.data.data.openid)
            } else {
              // me.$toast.fail(res.data.msg);
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
     // 测试登录
     //  sessionStorage.setItem('userId','123456')
     //  this.$axios.get('/api/test/login',{})
     //   .then((res)=>{
     //     if(res.data.status!==0){
     //       me.$toast(res.data.msg)
     //     }
     //   })
     //   .catch((err)=>{console.log(err)})
    console.log('session=='+sessionStorage.getItem('userId'))
    wxshare.wxshare(this.$address,sessionStorage.getItem('userId'))
  }
}
</script>
<style lang="scss">
  .hello{
    width: 100%;
    height: 100%;
    position: relative;
    text-align: center;
    background: #213629;
    .bgimg{
      width: 100%;
     // height:664px;
      height:730px;
    }
    .indexTopic{
      position: absolute;
      width: 308.5px;
      height: 167.5px;
      top:50px;
      left: 50%;
      margin-left:-154px;
    }
    .onthewayBtn{
      z-index:2;
      position:fixed;
      width: 136px;
      height:51px;
      left:50%;
      bottom:35px;
      margin-left:-68px;
    }
    .clockinBtn{
      z-index:2;
      position:fixed;
      width: 136px;
      height:51px;
      left:50%;
      bottom:100px;
      margin-left:-68px;
    }
  }
  .logo{
    position: absolute;;
    z-index:2;
    width: 161px;
    height: 25px;
    left:20px;
    top:20px;
  }

</style>
