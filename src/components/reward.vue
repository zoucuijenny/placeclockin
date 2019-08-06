<template>
    <div class="rewardWrap" >
      <img class="logo" :src="logo">
      <img  class="rewardbg" :src="rewardbg">
      <img  class="rewardHotelcard" :src="rewardHotelcard" v-show="showRewardbgHotel">
      <img  class="rewardPlaceCard" :src="rewardPlaceCard" v-show="showRewardPlace">
      <div class="crashCard" v-show="showRewardCrash"><span class="bigT" @click="openMoneyUrl()">{{money}}</span>元</div>
      <img  class="rewardText8 rewardText" :src="rewardText">
      <img  class="btnShare" :src="btnShare" >
      <!--<div class="text">旅行路上 总有风景在等你</div>-->
    </div>
</template>

<script>
  import logo from '../assets/images/logored.png'

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

  import btnShare from '../assets/images/btnShare.png'

  import { createNamespacedHelpers } from 'vuex'
  const { mapState } = createNamespacedHelpers('data/')

    export default {
     data(){
       return{
         logo:logo,
         rewardbgNo:rewardbgNo,
         rewardbgHotel:rewardbgHotel,
         rewardbgPlace:rewardbgPlace,
         rewardbgCrash:rewardbgCrash,
         rewardbg:rewardbgCrash,
         rewardText:rewardText8,
         btnShare:btnShare,
         showRewardbgHotel:false,
         showRewardPlace:false,
         showRewardCrash:true,
         rewardHotelcard:rewardHotelcard,
         rewardPlaceCard:rewardPlaceCard,
         money:null,
         moneyUrl:'0'
       }
     },
      computed:{
        ...mapState({
          imgBaseUrl:state=>state.imgBaseUrl,
          backReward:state=>state.backReward
        })
      },
      methods:{
       share:function(){

       },
        openMoneyUrl:function(){
         window.location.href=this.moneyUrl
        }
      },
      created:function(){
       let me=this
        // to do 获取获奖结果 设置背景 图片展示 文字
        console.log('type'+JSON.stringify(me.backReward))
        switch (me.backReward.type) {
          case 0:
            me.rewardbg=me.rewardbgNo
                break
          case 1:
            me.rewardbg=me.rewardbgCrash
            me.money=me.backReward.money
            me.moneyUrl=me.backReward.moneyUrl
            break
          case 2:
            me.rewardbg=me.rewardbgPlace
            me.showRewardPlace=true
            break
          case 3:
            me.rewardbg=me.rewardbgHotel
            me.showRewardbgHotel=true
            break
          default: me.rewardbg=me.rewardbgNo
        }
        me.rewardText=me.imgBaseUrl+me.backReward.url
      }
    }
</script>

<style lang="scss">
  .rewardWrap{
    width: 100%;
    height: 100%;
    .rewardbg{
      width: 100%;
      height: 100%;
      position: absolute;
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
      top:352.5px;
      left:68px;
    }
    .rewardText1{
      width: 155.5px;
      height: 91.5px;
    }
    .rewardText2{
      width: 133px;
      height: 91px;
    }
    .rewardText3{
      width: 68px;
      height: 91.5px;
    }
    .rewardText4{
      width: 79.5px;
      height: 38.5px;
    }
    .rewardText5{
      width: 144.5px;
      height: 65px;
    }
    .rewardText6{
      width: 144.5px;
      height: 38.5px;
    }
    .rewardText7{
      width: 165.5px;
      height: 38.5px;
    }
    .rewardText8{
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
    }
    .rewardPlaceCard{
      width: 153.5px;
      height: 83px;
      position:absolute;
      top:210px;
      left:50%;
      margin-left:-77px;
    }
    .crashCard{
      position: absolute;
      top:245px;
      color:#fff;
      width: 100%;
      text-align: center;
      font-size: 15px;
      .bigT{
        font-size: 28px;
      }
    }

    /*.text{*/
      /*position: absolute;*/
      /*top:300px;*/
      /*left:68px;*/
      /*z-index: 3;*/
      /*color: #999;*/
      /*font-weight: bold;*/
    /*}*/
  }
</style>
