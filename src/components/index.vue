<template>
  <div class="hello">
    <img  class="bgimg" :src="indexbg">
    <img class="logo" :src="logo">
    <img :src="logo" alt="" class="logo">
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
  import wxshare from '../store/modules/share.js'
  import request from "../assets/js/request";
  import service from "../assets/js/service";
  import btnMusic from '../assets/vedio/btnMusic.mp3'
  import wx from 'weixin-js-sdk'
  //import wx from '../assets/js/service'
export default {
  data () {
    return {
      indexbg:indexbg,
      logo:logo,
      clockinBtn:clockinBtn,
      onthewayBtn:onthewayBtn,
      btnMusic:btnMusic
    }
  },
  methods:{
    isIPhone : function() {
      const uag = window.navigator.userAgent;
      let _isIPhone = true;
      if (uag.indexOf('Android') > -1 || uag.indexOf('Adr') > -1) {
        _isIPhone = false;
      }
      return _isIPhone;
    },
    totheway:function(){
      let me=this
      let  myVideo=document.getElementById("btnMusic");
      myVideo.play();
      setTimeout(function () {
        me.$router.push({name:'ontheway'})
      },300)
    },
    toclock:function(){
      let me=this
      let  myVideo=document.getElementById("btnMusic");
        myVideo.play();
        setTimeout(function () {
          me.$router.push({name:'pictureClock'})
         // window.location.href= '/pictureClock'
        },300)
    }
  },
  created:function () {
    wxshare.wxshare(this.$route.fullPath, localStorage.getItem('userId'))
    wxshare.successfulShare(this.$route.query)
    wx.sdkConfig()
    let me=this
    // this.$axios.get('/api/test/login',{})
    //  .then((res)=>{ me.$toast(res.data.msg)})
    //  .catch((err)=>{console.log(err)})
}
}
</script>
<style lang="scss">
  .hello{
    width: 100%;
    height: 100%;
    position: relative;
    .bgimg{
      width: 100%;
      height:664px;
    }
    .onthewayBtn{
      z-index:2;
      position:absolute;
      width: 136px;
      height:51px;
      left:50%;
      bottom:35px;
      margin-left:-68px;
    }
    .clockinBtn{
      z-index:2;
      position:absolute;
      width: 136px;
      height:51px;
      left:50%;
      bottom:100px;
      margin-left:-68px;
    }
  }
  .logo{
    position: absolute;;
    z-index:999;
    width: 161px;
    height: 25px;
    left:20px;
    top:20px;
  }

</style>
