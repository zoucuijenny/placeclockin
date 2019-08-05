<template>
    <div class="placeDetail">
      <img class="logo" :src="logo">
      <img class="backBtn" :src="btnBack" @click="back()">

      <div class="countDown" :style="countDownStyle">
        <!--再浏览{{countDowm}}秒<br/>打卡成功-->
         <div class="countNumber">{{countDowm}}</div>
      </div>
      <img class="placedetailbg" :src="placedetailbg" >
      <div class="clockSucessBg" v-show="showClockSucessBg">
        <img class="succcess" :src="succcess" >
      </div>
    </div>
</template>

<script>
  import logo from '../assets/images/logored.png'
  import btnBack from '../assets/images/btnback.png'
  import clockSuccess from '../assets/vedio/clockSuccess.mp3'
  import countDownBg from '../assets/images/countDownBg.png'
  import dbsBg from '../assets/images/placeDetail/dbs.jpg'
  import hsBg from '../assets/images/placeDetail/hs.jpg'
   import hsgBg from '../assets/images/placeDetail/hsg.jpg'
  import jfsBg from '../assets/images/placeDetail/jfs.jpg'
  import smsBg from '../assets/images/placeDetail/sms.jpg'
  import wlsBg from '../assets/images/placeDetail/wls.jpg'
  import xnsBg from '../assets/images/placeDetail/xns.jpg'

  import succcess from '../assets/images/clockSuccesspop.png'
  import service from '../assets/js/service'

    export default {
        name: "placeDetail",
      data(){
          return{
            logo:logo,
            btnBack:btnBack,
            bgs:[xnsBg,smsBg,dbsBg,hsgBg,jfsBg,wlsBg,hsBg],
            placedetailbg:xnsBg,
            countDowm:4,
            placeId:0,
            clockSuccess:clockSuccess,
            succcess:succcess,//打卡成功图片
            showClockSucessBg:false,//显示打卡成功蒙层
            countDownStyle:{
              background:'url('+ countDownBg+')',
              backgroundRepeat:'no-repeat',
              backgroundPosition:'0 0',
              backgroundSize:'100% 100%'
            }
          }
      },
      methods:{
        back:function(){
          this.$router.back(-1)
        },
        clock:function () {
          let me=this
          let arr=['a','b','c','d','e','f','g']
          let promise = service.clockIn.clock(arr[me.$route.params.placeId])
          promise.then(function (res) {
            console.log('请求返回结果',res)
            if(res.status===0){
              me.showClockSucessBg=true
              let audio = document.createElement('audio');
              audio.src=me.clockSuccess
              document.body.appendChild(audio)
              audio.play()
              setTimeout(function () {
                me.showClockSucessBg=false
              },1000)
            }
          })
        }
      },
      created:function(){
        let me=this
        me.placeId=me.$route.params.placeId
        me.placedetailbg=me.bgs[me.placeId]

          let timeDown=setInterval(function(){
            me.countDowm=me.countDowm-1
            if( me.countDowm===0){
              clearInterval(timeDown)
              me.clock()
            }
          },1000)
      }
    }
</script>

<style lang="scss">
  .placeDetail{
    .test{
      position: absolute;
      z-index:5;
      top:10px;
      left:10px;
      width: 20px;
      height: 20px;
      border-radius: 20px;
      background: #abcdef;
    }
    .backBtn{
      z-index:2;
      width: 35px;
      height: 43.5px;
      position:absolute;
      right:24px;
      top:13px;
    }
    .placedetailbg{
      width: 100%;
      height: auto;
      position: absolute;
      z-index: 1;
      top:0;
      left:0
    }
    .countDown{
     position: absolute;
      background-color: rgba(0,0,0,0.7);
      z-index:2;
      top:91px;
      left:0;
      width: 75px;
      height: 30px;
      color: #fff;
      text-align: center;
      font-size: 10px;
     // border-radius: 0 30px 30px 0;
      .countNumber{
        font-size: 10px;
        color:#ffffff;
        position: absolute;
        right:26px;
        top:4px;
        z-index: 3;
      }
    }
    .clockSucessBg{
      background: rgba(0,0,0,0.5);
      width: 100%;
      height: 100%;
      position: absolute;
      top:0;
      left: 0;
      z-index:10;
      text-align: center;
      .succcess{
        width: 140px;
        height: 156.5px;
        margin-top:200px;

      }
    }

  }

</style>
