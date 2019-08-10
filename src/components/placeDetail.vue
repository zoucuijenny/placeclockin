<template>
    <div class="placeDetail">
      <!--<img class="logo" :src="logo">-->
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
  import wxshare from '../store/modules/share.js'

  import { createNamespacedHelpers } from 'vuex'
  const { mapState } = createNamespacedHelpers('data/')
    export default {
      name: "placeDetail",
      data() {
        return {
          logo: logo,
          btnBack: btnBack,
          bgs: [xnsBg, smsBg, dbsBg, hsgBg, jfsBg, wlsBg, hsBg],
          placedetailbg: xnsBg,
          countDowm: 10,
          placeId: 0,
          clockSuccess: clockSuccess,
          succcess: succcess,//打卡成功图片
          showClockSucessBg: false,//显示打卡成功蒙层
          timeDown: null,
          countDownStyle: {
            background: 'url(' + countDownBg + ')',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '0 0',
            backgroundSize: '100% 100%'
          }
        }
      },
      methods: {
        back: function () {
          let me=this
          me.countDowm = 0
          clearInterval(me.timeDown)
          me.showClockSucessBg = false
          me.$router.back(-1)
        },
        clock: function () {
          let me = this
          let arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
          me.$axios.post('/api/punch', {place: arr[me.$route.params.placeId], status: '1',token:sessionStorage.getItem('userId')})
            .then(function (res) {
              // console.log('请求返回结果',res)
              if (res.data.status === 0) {
                me.showClockSucessBg = true
                let audio = document.createElement('audio');
                audio.src = me.clockSuccess
                document.body.appendChild(audio)
                audio.play()
                setTimeout(function () {
                  me.showClockSucessBg = false
                }, 1000)
              } else {
                me.$toast.fail(res.data.msg)
              }
            })
            .catch((err) => {
              console.log(err)
            })
        },
        countDown: function () {
          let me = this
          me.timeDown = setInterval(function () {
            me.countDowm = me.countDowm - 1
            if (me.countDowm === 0 && me.$route.name=='placeDetail' ) {
              clearInterval(me.timeDown)
              me.clock()
            }
          }, 1000)
        }
      },
      destoryed:function(){
        let me=this
        clearInterval(me.timeDown)
      },
      deactivated:function(){
        this.$destroy('placeDetail')
      },
      created:function(){
        let me=this
        me.countDowm=10
        me.placeId=me.$route.params.placeId
        me.placedetailbg=me.bgs[me.placeId]
        me.$axios.get('/api/placeInfo',{ headers:{token:sessionStorage.getItem('userId')} })
          .then((res)=>{
            if(res.data.status===0){
              let datas =res.data.data
              var arr = []
              for(let k in datas){
                arr.push(datas[k])
              }
              let j=0
              for(let i in arr){
                j++
                if(j=== me.placeId+1){
                  switch(arr[i]){
                    case 0:
                      me.isClocked=false
                      break
                    case 1:
                      me.isClocked=true
                      break
                    default:  me.isClocked=false
                      break
                  }
                  if(!me.isClocked){
                    me.countDown()
                  }else{
                    me.countDowm=0
                  }
                  break
                }
              }
            }
          })
          .catch((err)=>{
            console.log(err)
          })
        wxshare.wxshare(this.$route.fullPath, sessionStorage.getItem('userId'))

      }
    }
</script>

<style lang="scss">
  .placeDetail{
    height: 100%;
    width: 100%;
    position: relative;
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
      position:fixed;
      right:10px;
      top:13px;
    }
    .placedetailbg{
      width: 100%;
      height: auto;
      /*position: absolute;*/
      /*z-index: 1;*/
      /*top:0;*/
      /*left:0*/
    }
    .countDown{
     position: fixed;
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
      position: fixed;
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
