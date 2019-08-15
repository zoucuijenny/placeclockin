<template>
    <div class="onthewayWrap" :style="wrapStyle">
      <img class="backBtn" :src="btnBack" @click="back()">
      <div class="nostartWrap" v-show="!isStart">
        <img class="noStartbg" :src="noStartbg" >
      </div>
      <div class="startWrap" v-show="isStart">
        <div class="startbgTopWrap">
          <img  class="startbgTop" :src="startbgTop" >
        </div>
        <div class="startContentWrap" :style="startContentWrapStyle">
          <div class="phoneBgdiv" :style="phoneBgdivStyle" @click="toDetail()"></div>
          <van-swipe  style="width:375px; height:560px;"  @change="onChange" :autoplay="3000">
            <van-swipe-item  v-for="(item,index) in startContent" :item="item" :key="index">
              <div class="placeItem">
               <img class="phonePhoto" :src="item.url" @click="toNext(item.place)">
              <img :src="item.text" class="startContent">
              <img :src="detailButton" class="detailOnTap" @click="toNext(item.place)">
              </div>
            </van-swipe-item>
            <div class="custom-indicator" slot="indicator" >
              <img :src='currentIndicator === index ? aIndicator:indicator' alt=""   class="indicatorImg"  v-for="(item,index) in startContent" :item="item" :key="index">
            </div>
          </van-swipe>
        </div>
      </div>
    </div>
</template>

<script>
  import { Swipe, SwipeItem } from 'vant';
  import indicator from '../assets/images/indicator.png'
  import activeIndicator from '../assets/images/activeIndicator.png'
  import noStartbg from '../assets/images/bgOnwayNostart.jpg'
  import startbgTop from '../assets/images/startbgTop.png'
  import btnBack from '../assets/images/btnback.png'
  import phoneBg from '../assets/images/phoneBg.png'
  import statusFlag from '../assets/images/statusFlag.png'
  import detailButton from '../assets/images/detailButton.png'

  import atj from '../assets/images/bannerText/atj.png'
  import dbs from '../assets/images/bannerText/dbs.png'
  import hs from '../assets/images/bannerText/hs.png'
  import hsg from '../assets/images/bannerText/hsgsh.png'
  import jfs from '../assets/images/bannerText/jfs.png'
  import wls from '../assets/images/bannerText/wls.png'
  import xns from '../assets/images/bannerText/xns.png'
  import  contentBg from '../assets/images/bannerContentbg.png'
  import phonePhoto from '../assets/images/albumTop.jpg'
  import { createNamespacedHelpers } from 'vuex'
  const { mapState } = createNamespacedHelpers('data/')

  import wxshare from '../store/modules/share.js'

    export default {
       data(){
         return {
           moudleNameSpace:'data/',
           aIndicator:activeIndicator,
           indicator:indicator,
           clientWidth:0,
           currentIndicator: 0,
           currentPlaceIndex:'f',
           isStart:true,
           noStartbg:noStartbg,
           startbgTop:startbgTop,
           contentBg:contentBg,
           btnBack:btnBack,
           phoneBg:phoneBg,
           statusFlag:statusFlag,
           atj:atj,
           dbs:dbs,
           hs:hs,
           jfs:jfs,
           hsg:hsg,
           wls:wls,
           xns:xns,
           startContent:[],
           detailButton:detailButton,
           phonePhoto:phonePhoto,
           wrapStyle:{
             width:this.clientWidth+'px',
             overflow:'hidden'
           },
           startContentWrapStyle:{
             width:this.clientWidth+'px',
             backgroundImage:'url('+contentBg+')',
             backgroundRepeat:'no-repeat',
             backgroundSize:'100% 100%',
             backgroundPosition:'0,0'
           },
           phoneBgdivStyle:{
             width:this.clientWidth+'px',
             backgroundImage:'url('+phoneBg+')',
             backgroundRepeat:'no-repeat',
             backgroundSize:'100% 100%',
             backgroundPosition:'0,0'
           }
         }
       },
      components:{
          [Swipe.name]:Swipe,
          [SwipeItem.name]:SwipeItem
      },
      computed: {
        ...mapState({
          imgBaseUrl: state => state.imgBaseUrl
        })
      },
      methods:{
        onChange(index) {
          let me=this
          me.currentIndicator = index
          me.currentPlaceIndex=me.startContent[index].place
        },
        back:function(){
           this.$router.push({name:'index'})
        },
        toNext:function (index) {
          this.$router.push({name: 'album',params:{place:index}})
        },
        toDetail:function(){
          let me=this
          this.$router.push({name: 'album',params:{place:me.currentPlaceIndex}})
        },
        getBanners:function () {
          let me=this
          me.startContent=[]
          me.$axios.get('api/onroad/bigpicture',{hearders:{token:sessionStorage.getItem('userId')}})
            .then((res)=>{
             // console.log('datu'+JSON.stringify(res))
              if(res.data.status===0){
                me.$store.commit(me.moudleNameSpace+'setAlbumTopData',{data:res.data.data})
                for(let item of res.data.data){
                  let temp={}
                  temp.url=item.url
                  temp.place=item.place
                  switch (item.place){
                    case 'a':
                      temp.text=me.xns
                      break
                    case 'b':
                      temp.text=me.sms
                      break
                    case 'c':
                      temp.text=me.dbs
                      break
                    case 'd':
                      temp.text=me.hsg
                      break
                    case 'e':
                      temp.text=me.jfs
                      break
                    case 'f':
                      temp.text=me.wls
                      break
                    case 'g':
                      temp.text=me.hs
                      break
                    default:
                      temp.text=me.sms
                      break
                  }
                  me.startContent.push(temp)
                }
              }else{
                me.$toast.fail(res.data.msg)
              }
            })
            .catch((err)=>{
                console.log(err)
              }

            )
        }
      },
      created:function () {
        this.getBanners()
        wxshare.wxshare(this.$route.fullPath, sessionStorage.getItem('userId'))
      },
      mounted(){
        window.onresize = () => {
          this.clientWidth = document.body.clientWidth
        }
      }
    }
</script>

<style lang="scss">
  .onthewayWrap{
    background: #c7eefd;
    .backBtn{
      z-index:3;
      width: 35px;
      height: 43.5px;
      position:fixed;
      right:10px;
      top:13px;
    }
    .noStartbg{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
    .startWrap{
      height: 100%;
      width: 100%;
        .startbgTopWrap{
          width: 100%;
          margin-bottom: 0;
          padding-bottom: 0;
          .startbgTop{
            width:100%;
            height: auto;
            margin-bottom: 0;
          }
        }
        .startContentWrap{
          width: 100%;
          height: 100%;
          position:relative;
          display: flex;
          justify-content: center;
          .phoneBgdiv{
            position: absolute;
            width: 100%;
            height: 193.5px;
            top:0;
            left:0;
            z-index:2;
          }
          .placeItem{
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .phonePhoto{
              width:324px;
              height: 178px;
              margin-top:13px;
              margin-left: 5px;
            }
            .startContent{
              width: 300px;
              height: 183px;
              margin-top: 70px;
            }
            .detailOnTap{
              width: 100px;
              height: 27.5px;
              margin-top: 30px;
            }
            /*.van-swipe__indicators{*/
              /*bottom: 340px;*/
            /*}*/
          }
        }
    }
  }
  .custom-indicator{
    width: 100%;
    height: 20px;
    top:213px ;
    position: absolute;
    text-align: center;
    .indicatorImg{
      width: 14.5px;
      height: 16.5px;
    }
  }
</style>
