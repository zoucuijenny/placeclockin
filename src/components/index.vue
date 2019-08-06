<template>
  <div class="hello">
    <img  class="bgimg" :src="indexbg">
    <img class="logo" :src="logo">
    <img :src="logo" alt="" class="logo">
    <img @click="toclock()" class="clockinBtn" :src="clockinBtn">
    <img @click="totheway()" class="onthewayBtn" :src="onthewayBtn">
  </div>
</template>
<script>
  import indexbg from '../assets/images/p1bg.jpg'
  import logo from '../assets/images/logowhite.png'
  import onthewayBtn from '../assets/images/ontheway.png'
  import clockinBtn from '../assets/images/btnclockin.png'
  import request from "../assets/js/request";
  import service from "../assets/js/service";
  //import wx from '../assets/js/service'
export default {
  data () {
    return {
      indexbg:indexbg,
      logo:logo,
      clockinBtn:clockinBtn,
      onthewayBtn:onthewayBtn
    }
  },
  methods:{
    totheway:function(){
      this.$router.push({name:'ontheway'})
    },
    toclock:function(){
      this.$router.push({name:'pictureClock'})
    }
  },
  created:function () {
    //wx.sdkConfig()
     service.testLogin
  }
}
</script>
<style lang="scss">
  .hello{
    background-color: #abcdef;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .bgimg{
      width: 100%;
      height: 100%;
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
