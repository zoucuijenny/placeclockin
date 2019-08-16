<template>
    <div class="rewardWrap" >
      <img  class="rewardbg" :src="rewardbg">
      <img class="logo" :src="logo">
      <img class="backBtn" :src="btnBack" @click="back()">
      <img  class="rewardHotelcard" :src="rewardHotelcard" v-show="showRewardbgHotel">
      <img  class="rewardPlaceCard" :src="rewardPlaceCard" v-show="showRewardPlace">
      <div class="crashCard" v-show="showRewardCrash">
        <span class="bigT" >{{money}}</span>元
      </div>
        <img  class="rewardText" :class="'rewardText'+rewardClass" :src="rewardText">
        <img  class="btnShare" :src="btnShare" @click="btnShared()" >
       <div class="popwindow" v-if="showShareNotice" @click="closeShareWindow()">
           <img class="shareNotice" :src="shareNotice" >
       </div>
      <!--<div class="text">旅行路上 总有风景在等你</div>-->
      <audio  id="btnMusic2">
        <source :src="btnMusic" type="audio/mpeg" >
      </audio>
    </div>
</template>
<script>
  import logo from '../assets/images/logored.png'
  import btnBack from '../assets/images/btnback.png'

  import rewardbgNo from '../assets/images/rewardBgNO.png'
  import rewardbgHotel from '../assets/images/rewardBgHotel.png'
  import rewardbgPlace from '../assets/images/rewardBgPlace.png'
  import rewardbgCrash from '../assets/images/rewardBgCrash.png'
  import rewardHotelcard from '../assets/images/hotelCardDemo.png'
  import rewardPlaceCard from '../assets/images/placeCardDemo.png'

  import rewardText1 from '../assets/images/rewardText/text1.png'
  import rewardText2 from '../assets/images/rewardText/text2.png'
  import rewardText3 from '../assets/images/rewardText/text3.png'
  import rewardText4 from '../assets/images/rewardText/text4.png'
  import rewardText5 from '../assets/images/rewardText/text5.png'
  import rewardText6 from '../assets/images/rewardText/text6.png'
  import rewardText7 from '../assets/images/rewardText/text7.png'
  import rewardText8 from '../assets/images/rewardText/text8.png'
  import wxshare from '../store/modules/share.js'

  import btnShare from '../assets/images/btnShare.png'
  import btnMusic from '../assets/vedio/btnMusic.mp3'
  import shareNotice from '../assets/images/xuanyaoText.png'
  import wx from 'weixin-js-sdk';
    export default {
     data(){
       return{
         logo:logo,
         btnBack:btnBack,
         rewardbgNo:rewardbgNo,
         rewardbgHotel:rewardbgHotel,
         rewardbgPlace:rewardbgPlace,
         rewardbgCrash:rewardbgCrash,
         rewardbg:rewardbgNo,
         rewardText:rewardText8,
         btnShare:btnShare,
         showRewardbgHotel:false,
         showRewardPlace:false,
         showRewardCrash:false,
         rewardHotelcard:'',
         rewardPlaceCard:'',
         rewardClass:'p8',
         money:null,
         moneyUrl:'0',
         btnMusic:btnMusic,
         shareNotice:shareNotice,
         showShareNotice:false,
         backReward:null
       }
     },
      methods:{
       share:function(){

       },
        back:function(){
         this.$router.push({name:'pictureClock'})
        },
        openMoneyUrl:function(url){
        let me=this
          console.log('外即将打开红包'+localStorage.getItem('isCrashOpened'))
          console.log('local'+typeof(localStorage.getItem('isCrashOpened')))
          //若红包未打开过，则自动打开
          let local=localStorage.getItem('isCrashOpened')
          if(local==='false'){
          //  setTimeout(function () {
              localStorage.setItem('isCrashOpened',true)
            console.log('即将打开红包'+url)
              window.location.href=url
          //  },2000)
          }
        },
        btnShared:function() {
          let me = this
          let myVideo = document.getElementById("btnMusic2");
              myVideo.play();
              me.showShareNotice = true
           },
        closeShareWindow:function(){
         this.showShareNotice=false
        }
      },
      created:function(){
       let me=this
       // to do 获取获奖结果 设置背景 图片展示 文字
        me.backReward=localStorage.getItem('prizeResult')
        me.backReward=JSON.parse( me.backReward)
        console.log('type=='+typeof(me.backReward))
        switch (me.backReward.type) {
          case 0:
            me.rewardbg=me.rewardbgNo
                break
          case 1:
            me.openMoneyUrl(me.backReward.moneyUrl)
            me.rewardbg=me.rewardbgCrash
            me.money=me.backReward.money
            me.moneyUrl=me.backReward.moneyUrl
            me.showRewardCrash=true
            break
          case 2:
            me.showRewardPlace=true
            me.rewardbg=me.rewardbgPlace
            me.rewardPlaceCard=me.$imgbaseUrl+me.backReward.url
            break
          case 3:
            me.showRewardbgHotel=true
            me.rewardbg=me.rewardbgHotel
            me.rewardHotelcard=me.$imgbaseUrl+me.backReward.url
            break
          default :
            me.rewardbg=me.rewardbgNo
            break
        }
        me.rewardText=me.$imgbaseUrl+me.backReward.texturl
        me.rewardClass= me.backReward.serial
        console.log('ssss'+me.$imgbaseUrl)
        wxshare.wxshare(this.$route.fullPath, sessionStorage.getItem('userId'))


      }
    }
</script>

<style lang="scss">
  .rewardWrap{
    width: 100%;
    height: 100%;
    overflow: hidden;
    .logo{
      position: absolute;;
      z-index:2;
      width: 161px;
      height: 25px;
      left:20px;
      top:20px;
    }
    .backBtn{
      z-index:2;
      width: 35px;
      height: 43.5px;
      position:fixed;
      right:10px;
      top:13px;
    }
    .rewardbg{
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 1;
      left:0;
      top:0;
    }
    .btnShare{
      width: 137px;
      height: 51px;
      position: absolute;
      bottom: 74.5px;
      left:50%;
      margin-left:-68.5px;
      z-index: 2;
    }
    .rewardText{
      position:absolute;
      z-index: 2;
      /*top:352.5px;*/
      top:53.1%;
      left:18.7%;
    }
    .rewardTextp1{
      width: 155.5px;
      height: 91.5px;
    }
    .rewardTextp2{
      width: 133px;
      height: 91px;
    }
    .rewardTextp3{
      width: 68px;
      height: 91.5px;
    }
    .rewardTextp4{
      width: 79.5px;
      height: 38.5px;
    }
    .rewardTextp5{
      width: 144.5px;
      height: 65px;
    }
    .rewardTextp6{
      width: 144.5px;
      height: 38.5px;
    }
    .rewardTextp7{
      width: 165.5px;
      height: 38.5px;
    }
    .rewardTextp8{
      width: 187.5px;
      height: 65px;
    }
    .rewardHotelcard{
      width: 153.5px;
      height: 83px;
      position:absolute;
      top:210px;
      left:50%;
      margin-left:-77px;
      z-index: 2;
    }
    .rewardPlaceCard{
      width: 153.5px;
      height: 83px;
      position:absolute;
      top:210px;
      left:50%;
      margin-left:-77px;
      z-index: 2;
    }
    .crashCard{
      position: absolute;
      top:36.74%;
      color:#fff;
      width: 100%;
      text-align: center;
      font-size: 15px;
      z-index:2;
      .bigT{
        font-size: 28px;
      }
    }
    .popwindow{
      position: fixed;
      width: 100%;
      height: 100%;
      z-index: 10;
      top:0;
      left:0;
      background: rgba(0,0,0,0.5);
    }
    .shareNotice{
     position:absolute;
      right:40px;
      top:5px;
      width: 147.5px;
      height: 67px;
      z-index:11;
    }
  }
</style>
