<template>
    <div class="pcClockWrap">
      <img class="backBtn" :src="btnBack" @click="back()">
      <div class="shctimg">
        <img class="bgimg1 gifbg" :src="bgimg1" >
        <img class="bgimg2 gifbg" :src="bgimg2" >
        <img class="bgimg3 gifbg" :src="bgimg3" >
        <img class="bgimg4 gifbg" :src="bgimg4" >
        <img class="bgimg5 gifbg" :src="bgimg5" >
      </div>
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
          <div class="afterClock"  v-if="clockStatus[0]"  @click="clickClock(0)">
            <img class="completeClock" :src="completeClock">
            <img class="completeClockText"  :src="completeClockText" >
          </div>
        </div>
      <div class="sms">
        <div class="beforeClock" v-if="!clockStatus[1]" @click="clickClock(1)">
          <img class="locationIcon" :src="locationIcon">
          <img class="clickClockText"  :src="clickClockText" >
        </div>
        <div class="afterClock" v-if="clockStatus[1]" @click="clickClock(1)">
          <img class="completeClock" :src="completeClock">
          <img class="completeClockText"  :src="completeClockText" >
        </div>
      </div>
      <div class="dbs">
        <div class="beforeClock" v-show="!clockStatus[2]" @click="clickClock(2)">
          <img class="locationIcon" :src="locationIcon">
          <img class="clickClockText"  :src="clickClockText" >
        </div>
        <div class="afterClock" v-show="clockStatus[2]" @click="clickClock(2)">
          <img class="completeClock" :src="completeClock">
          <img class="completeClockText"  :src="completeClockText" >
        </div>
      </div>
      <div class="hsg">
        <div class="beforeClock" v-show="!clockStatus[3]" @click="clickClock(3)">
          <img class="locationIcon" :src="locationIcon">
          <img class="clickClockText"  :src="clickClockText" >
        </div>
        <div class="afterClock" v-show="clockStatus[3]" @click="clickClock(3)">
          <img class="completeClock" :src="completeClock">
          <img class="completeClockText"  :src="completeClockText" >
        </div>
      </div>
      <div class="jfs">
        <div class="beforeClock" v-show="!clockStatus[4]" @click="clickClock(4)">
          <img class="locationIcon" :src="locationIcon">
          <img class="clickClockText"  :src="clickClockText" >
        </div>
        <div class="afterClock" v-show="clockStatus[4]" @click="clickClock(4)">
          <img class="completeClock" :src="completeClock">
          <img class="completeClockText"  :src="completeClockText" >
        </div>
      </div>
      <div class="wls">
        <div class="beforeClock" v-show="!clockStatus[5]" @click="clickClock(5)">
          <img class="locationIcon" :src="locationIcon">
          <img class="clickClockText"  :src="clickClockText" >
        </div>
        <div class="afterClock" v-show="clockStatus[5]" @click="clickClock(5)">
          <img class="completeClock" :src="completeClock">
          <img class="completeClockText"  :src="completeClockText" >
        </div>
      </div>
      <div class="hs">
        <div class="beforeClock" v-show="!clockStatus[6]" @click="clickClock(6)">
          <img class="locationIcon" :src="locationIcon">
          <img class="clickClockText"  :src="clickClockText" >
        </div>
        <div class="afterClock" v-show="clockStatus[6]" @click="clickClock(6)">
          <img class="completeClock" :src="completeClock">
          <img class="completeClockText"  :src="completeClockText" >
        </div>
      </div>
      <!--打卡须知-->
      <div class="dkxzWrap" v-show="dkxzShow">
        <div class="dkxzInnerWrap">
          <img class="closeBtn" :src="closeBtn" @click="dkxz()">
          <img :src="dkxzTitle" class="dkxzTitle" >
          <div class="contentBox">
            <div class="textwrap">
              <img class="dkxzImg" :src="dkxzCon">
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import logo from '../assets/images/logored.png'
  import btnBack from '../assets/images/btnback.png'
  import  btnykyz  from '../assets/images/btnykyz.png'
  import  btndkxz  from '../assets/images/btndkxz.png'
  import shct from '../assets/images/p2bg.jpg'
  import locationIcon from '../assets/images/location.png'
  import clickClockText from '../assets/images/clickclock.png'
  import completeClock from '../assets/images/completeClock.gif'
  import completeClockText from '../assets/images/completeClockText.png'
  import closeBtn from '../assets/images/closeBtn.png'
  import dkxzCon from '../assets/images/dkxzContent.png'
  import dkxzTitle from '../assets/images/dkxzTitle.png'

  import bgimg1 from '../assets/images/bggif/bggif1.gif'
  import bgimg2 from '../assets/images/bggif/bggif2.gif'
  import bgimg3 from '../assets/images/bggif/bggif3.gif'
  import bgimg4 from '../assets/images/bggif/bggif4.gif'
  import bgimg5 from '../assets/images/bggif/bggif5.gif'

  import service from '../assets/js/service'
  import wxshare from '../store/modules/share.js'

  import { createNamespacedHelpers } from 'vuex'
  const { mapState } = createNamespacedHelpers('data/')


    export default {
     data(){
       return{
         logo:logo,
         btnBack:btnBack,
         btnykyz:btnykyz,
         btndkxz:btndkxz,
         closeBtn:closeBtn,
         shct:shct,
         locationIcon:locationIcon,
         clickClockText:clickClockText,
         completeClock:completeClock,
         completeClockText:completeClockText,
         dkxzCon:dkxzCon,
         dkxzTitle:dkxzTitle,
         cardCount:0,
         moudelNamespace:'data/',
         bgimg1:bgimg1,
         bgimg2:bgimg2,
         bgimg3:bgimg3,
         bgimg4:bgimg4,
         bgimg5:bgimg5,

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
           dkxzShow:state=>state.dkxzShow,
           prefix:state=>state.prefix
        })
      },

      methods:{
        back:function(){
          this.$router.push({name:'index'})
        },
        share: function(){
          console.log(this.$route.path)
          let userId = sessionStorage.getItem('userId')
          wxshare.wxshare(location.href.split('#')[0], userId)
        },

        clickClock:function(data){
      //  window.location.href = `/placeDetail?placeId=${data}`;
         this.$router.push(
           {
             name: 'placeDetail',
             params: {
               placeId: data
             }
           }
         )
        },
        ykyz:function(){
          this.$router.push({name:'postStation'})
         //window.location.href = '/postStation'
        },
        dkxz:function(){
         let me=this
          this.$store.commit(me.moudelNamespace+'changeDkxz',{data:!me.dkxzShow})
        },
        getCardCount:function(){
          let me=this
          me.$axios.get('/api/cardInfo',{hearders:{token:sessionStorage.getItem('userId')}})
            .then((res)=>{
              //console.log('获取打卡情况：'+JSON.stringify(res))
              if(res.data.status===0){
                me.cardCount=res.data.data.cardNum
                if( me.cardCount>10||me.cardCount===10){
                  me.$toast('今日你已累计获得10张明信片，每日最多累计获得10张')
                }
              }else{
                me.$toast.fail(res.data.msg)
              }
            })
            .catch((err)=>{
              console.log(err)
            })
        }
      },
      created:function () {
        let me=this
        me.getCardCount()
         me.$axios.get('/api/placeInfo',{hearders:{token:sessionStorage.getItem('userId')}})
        .then(function (res) {
          if(res.data.status===0){
            let data =res.data.data
            let j=0
            for(let i in data){
              j++
              switch(data[i]){
                case 0:
                  me.$set( me.clockStatus,j-1,false)
                  break
                case 1:
                  me.$set( me.clockStatus,j-1,true)
                  break
                default:  me.$set( me.clockStatus,j-1,false)
              }
            }
           // me.$forceUpdate(); 强制更新数据
          }else{
            me.$toast.fail(res.data.msg)
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
  .ykyz{
    z-index:2;
    width: 38px;
    height: 43px;
    position:fixed;
    right:93px;
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
    position:fixed;
    right:50px;
    top:20px;
  }
  .backBtn{
    z-index:2;
    width: 35px;
    height: 43.5px;
    position:fixed;
    right:10px;
    top:20px;
  }
  .beforeClock{
    position: relative;
    height: 61.5px;
    .locationIcon{
      width: 47px;
      height: 48px;
      position: absolute;
      -webkit-animation: jump 1s 2s infinite;
      -o-animation: jump 1s 2s infinite;
      animation: jump 1s 2s infinite;

    }
    .clickClockText{
      position: absolute;
      bottom: 0;
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
    .gifbg{
      width: 100%;
      height: auto;
      padding:0;
      border:0;
      margin:0;
      display:block;
    }
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
      position: fixed;
      z-index:10;
      top:0;
      left:0;
      display: flex;
      justify-content: center;
      align-items: center;
      .dkxzInnerWrap{
        /*margin-top: 69.5px;*/
        padding-top: 18px;
        position: relative;
        .dkxzTitle {
          position: absolute;
          top: 18px;
          left: 50%;
          margin-left: -104.5px;
          width: 209.5px;
          height: 36.5px;
        }
        .contentBox{
          margin-top: 22.5px;
          padding: 25px;
          width: 298px;
          background-color: #8bdcff;
          border-radius: 5px;
          .textwrap{
            background: #fff;
            width: 278px;
            padding:15px 10px;
            border-radius: 5px;
            .dkxzImg{
              width:278.5px;
              height:384px;
            }
          }
        }
      }
      .closeBtn{
        width: 22.5px;
        height: 40.5px;
        position: absolute;
        right: 20px;
        top: 0;
      }

    }
    @keyframes jump {
      0%{
        margin-top:0
      }
     45%{
       margin-top:-15px;
     }
      100%{
        margin-top:0
      }
    }
  }

</style>
