<template>
    <div class="pcClockWrap">
        <img class="shctimg" :src="shct">
        <img class="logo" :src="logo">
      <div class="ykyz">
        <img class="btnykyz" :src="btnykyz" @click="ykyz()">
        <div class="icon">{{cardCount}}</div>
      </div>

        <img class="btndkxz" :src="btndkxz" @click="dkxz()">
        <div class="xns">
          <div class="beforeClock"  v-if="!clockStatus[0]" @click="clickClock(0)">
            <img class="locationIcon" :src="locationIcon">
            <img class="clickClockText"  :src="clickClockText" >
          </div>
          <div class="afterClock"  v-if="clockStatus[0]" >
            <img class="completeClock" :src="completeClock">
            <img class="completeClockText"  :src="completeClockText" >
          </div>
        </div>
      <div class="sms">
        <div class="beforeClock" v-if="!clockStatus[1]" @click="clickClock(1)">
          <img class="locationIcon" :src="locationIcon">
          <img class="clickClockText"  :src="clickClockText" >
        </div>
        <div class="afterClock" v-if="clockStatus[1]">
          <img class="completeClock" :src="completeClock">
          <img class="completeClockText"  :src="completeClockText" >
        </div>
      </div>
      <div class="dbs">
        <div class="beforeClock" v-show="!clockStatus[2]" @click="clickClock(2)">
          <img class="locationIcon" :src="locationIcon">
          <img class="clickClockText"  :src="clickClockText" >
        </div>
        <div class="afterClock" v-show="clockStatus[2]">
          <img class="completeClock" :src="completeClock">
          <img class="completeClockText"  :src="completeClockText" >
        </div>
      </div>
      <div class="hsg">
        <div class="beforeClock" v-show="!clockStatus[3]" @click="clickClock(3)">
          <img class="locationIcon" :src="locationIcon">
          <img class="clickClockText"  :src="clickClockText" >
        </div>
        <div class="afterClock" v-show="clockStatus[3]">
          <img class="completeClock" :src="completeClock">
          <img class="completeClockText"  :src="completeClockText" >
        </div>
      </div>
      <div class="jfs">
        <div class="beforeClock" v-show="!clockStatus[4]" @click="clickClock(4)">
          <img class="locationIcon" :src="locationIcon">
          <img class="clickClockText"  :src="clickClockText" >
        </div>
        <div class="afterClock" v-show="clockStatus[4]">
          <img class="completeClock" :src="completeClock">
          <img class="completeClockText"  :src="completeClockText" >
        </div>
      </div>
      <div class="wls">
        <div class="beforeClock" v-show="!clockStatus[5]" @click="clickClock(5)">
          <img class="locationIcon" :src="locationIcon">
          <img class="clickClockText"  :src="clickClockText" >
        </div>
        <div class="afterClock" v-show="clockStatus[5]">
          <img class="completeClock" :src="completeClock">
          <img class="completeClockText"  :src="completeClockText" >
        </div>
      </div>
      <div class="hs">
        <div class="beforeClock" v-show="!clockStatus[6]" @click="clickClock(6)">
          <img class="locationIcon" :src="locationIcon">
          <img class="clickClockText"  :src="clickClockText" >
        </div>
        <div class="afterClock" v-show="clockStatus[6]">
          <img class="completeClock" :src="completeClock">
          <img class="completeClockText"  :src="completeClockText" >
        </div>
      </div>
      <!--打卡须知-->
      <div class="dkxzWrap" v-show="dkxzShow">
        <img class="closeBtn" :src="closeBtn" @click="dkxz()">
        <img class="dkxzCon" :src="dkxzCon">
      </div>
    </div>
</template>

<script>
  import logo from '../assets/images/logored.png'
  import  btnykyz  from '../assets/images/btnykyz.png'
  import  btndkxz  from '../assets/images/btndkxz.png'
  import shct from '../assets/images/p2bg.jpg'
  import locationIcon from '../assets/images/location.png'
  import clickClockText from '../assets/images/clickclock.png'
  import completeClock from '../assets/images/completeClock.png'
  import completeClockText from '../assets/images/completeClockText.png'
  import closeBtn from '../assets/images/closeBtn.png'
  import dkxzCon from '../assets/images/dkxzContent.png'

  import service from '../assets/js/service'
  import wxshare from '../store/modules/share.js'
  import { createNamespacedHelpers } from 'vuex'
  const { mapState } = createNamespacedHelpers('data/')


    export default {
     data(){
       return{
         logo:logo,
         btnykyz:btnykyz,
         btndkxz:btndkxz,
         closeBtn:closeBtn,
         shct:shct,
         locationIcon:locationIcon,
         clickClockText:clickClockText,
         completeClock:completeClock,
         completeClockText:completeClockText,
         dkxzCon:dkxzCon,
         cardCount:0,
         moudelNamespace:'data/',
         clockStatus:[false,true,false,false,false,false,false],
         //仙女山 四面山 大巴山 黑山谷 金佛山 武陵山 黄水
         xns:{
           isClock:false
         },
         sms:{
           isClock:false
         },
         dbs:{
           isClock:false
         },
         hsg:{
           isClock:false
         },
         jfs:{
           isClock:false
         },
        wls:{
          isClock:false
        },
         hs:{
           isClock:false
         }
       }
     },
      computed:{
        ...mapState({
           dkxzShow:state=>state.dkxzShow
        })
      },

      methods:{
        share: function(){
          console.log(this.$route.path)
          let userId = localStorage.getItem('userId')
          wxshare.wxshare(location.href.split('#')[0], userId)
        },

        clickClock:function(data){
          window.location.href = `/placeDetail?placeId=${data}`;
         // this.$router.push(
         //   {
         //     name: 'placeDetail',
         //     params: {
         //       placeId: data
         //     }
         //   }
         // )
        },
        ykyz:function(){
          // this.$router.push({name:'postStation'})
          window.location.href = '/postStation'
        },
        dkxz:function(){
         let me=this
          this.$store.commit(me.moudelNamespace+'changeDkxz',{data:!me.dkxzShow})
        }
      },
      created:function () {
        let me=this
        let result=service.clockIn.list()
        wxshare.wxshare(this.$route.fullPath, localStorage.getItem('userId'))
        wxshare.successfulShare(this.$route.query)
        result.then(function (res) {
          if(res.status===0){
            let data =res.data
            let j=0
            for(let i in data){
              j++
              switch(data[i]){
                case 0:
                  me.$set( me.clockStatus,j-1,false)
                  break
                case 1:
                  me.$set( me.clockStatus,j-1,true)
                  me.cardCount++
                  break
                default:  me.$set( me.clockStatus,j-1,false)
              }
            }
           // me.$forceUpdate(); 强制更新数据
          }
        })
      }
    }
</script>

<style lang="scss">
  .ykyz{
    z-index:2;
    width: 38px;
    height: 43px;
    position:absolute;
    right:70px;
    top:20px;
    .btnykyz{
      width: 38px;
      height: 43px;
    }
    .icon{
      width: 20px;
      height: 20px;
      background: #ff0806;
      border-radius: 20px;
      text-align: center;
      color:#fff;
      line-height: 20px;
      position: absolute;
      z-index: 3;
      top:-5px;
      left:25px;
    }
  }
  .btndkxz{
    z-index:2;
    width: 36px;
    height: 43px;
    position:absolute;
    right:24px;
    top:20px;
  }
  .beforeClock{
    .locationIcon{
      width: 47px;
      height: 48px;
    }
    .clickClockText{
      width: 46px;
      height: 13.5px;
    }
  }
 .afterClock{
   .completeClock{
     width: 36.5px;
     height: 46px;
   }
   .completeClockText{
     width: 36.5px;
     height: 11px;
   }
 }
  .pcClockWrap{
   width:100%;
   height: 100%;
    position:relative;
  .shctimg{
    width:100%;
    height: 100%;
  }
    .xns{
      position: absolute;
      top:358px;
      right:166px;
      width: 48px;
      height: 47px;
    }
    .sms{
      position: absolute;
      top:765px;
      left:83px;
      width: 48px;
      height: 47px;
    }
    .dbs{
      position: absolute;
      top:1052.5px;
      left:222.5px;
      width: 48px;
      height: 47px;
    }
    .hsg{
      position: absolute;
      top:1485px;
      left:170px;
      width: 48px;
      height: 47px;
    }
    .jfs{
      position: absolute;
      top:1775px;
      left:262.5px;
      width: 48px;
      height: 47px;
    }
    .wls{
      position: absolute;
      top:2642.5px;
      left:245px;
      width: 48px;
      height: 47px;
    }
    .hs{
      position: absolute;
      top:2967.5px;
      left:280px;
      width: 48px;
      height: 47px;
    }
    .dkxzWrap{
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.5);
      position: absolute;
      z-index:10;
      top:0;
      left:0;
      text-align: center;
      .closeBtn{
        width: 22.5px;
        height: 40.5px;
        top:68px;
        left:302.5px;
        position: absolute;
      }
      .dkxzCon{
       margin-top:85px;
        width:316px;
        height:500px;
      }
    }
  }

</style>
