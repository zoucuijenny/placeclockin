<template>
    <div class="onthewayWrap">
      <img class="backBtn" :src="btnBack" @click="back()">
      <div class="nostartWrap" v-show="!isStart">
        <img class="noStartbg" :src="noStartbg" >
      </div>
      <div class="startWrap" v-show="isStart">
        <!--<img class="startbg" :src="startbg" >-->
        <div class="startbgTopWrap">
          <img  class="startbgTop" :src="startbgTop" >
        </div>
        <div class="startContentWrap" :style="startContentWrapStyle">
          <div class="placeItem" v-for="(item,index) in startContent" :item="item" :index="index">
            <div class="phoneBgdiv" :style="phoneBgdivStyle">
              <img class="phonePhoto" :src="item.url" >
            </div>
            <img :src="statusFlag" class="statusFlag">
            <img :src="item.text" class="startContent">
            <img :src="detailButton" class="detailOnTap" @click="toNext(item.place)">
          </div>
        </div>
      </div>
    </div>
</template>

<script>
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
           isStart:true,
           noStartbg:noStartbg,
           startbgTop:startbgTop,
           contentBg:contentBg,
           btnBack:btnBack,
           phoneBg:phoneBg,
           statusFlag:statusFlag,
           startContent:[
             {
               text:atj,
               url:phonePhoto
             },
             {
               text:dbs,
               url:phonePhoto
             },
             {
               text:hs,
               url:phonePhoto
             },
             {
               text:jfs,
               url:phonePhoto
             },
             {
               text:hsg,
               url:phonePhoto
             },
             {
               text:wls,
               url:phonePhoto
             },
             {
               text:xns,
               url:phonePhoto
             }],
           detailButton:detailButton,
           phonePhoto:phonePhoto,
           startContentWrapStyle:{
             backgroundImage:'url('+contentBg+')',
             backgroundRepeat:'no-repeat',
             backgroundSize:'100% 100%',
             backgroundPosition:'0,0'
           },
           phoneBgdivStyle:{
             backgroundImage:'url('+phoneBg+')',
             backgroundRepeat:'no-repeat',
             backgroundSize:'100% 100%',
             backgroundPosition:'0,0'
           }
         }
       },
      computed: {
        ...mapState({
          imgBaseUrl: state => state.imgBaseUrl
        })
      },
      methods:{
        back:function(){
          // this.$router.back(-1)
          window.history.back()
        },
        toNext:function (index) {
         // window.location.href=`/album?place=${index}`
          this.$router.push({name: 'album',params:{place:index}})
        },
        getBanners:function () {
          let me=this
          me.startContent=[]
          me.$axios.get('api/onroad/bigpicture',{hearders:{token:localStorage.getItem('userId')}})
            .then((res)=>{
              // console.log('datu'+JSON.stringify(res))
              if(res.data.status===0){
                me.$store.commit(me.moudleNameSpace+'setAlbumTopData',{data:me.data.data})
                for(let item of me.data.data){
                  let temp={}
                  temp.url=me.imgBaseUrl+item.url
                  temp.place=item.place
                  console.log('dif'+item.place)
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
                      me.startContent.push(temp)
                  }
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
        wxshare.wxshare(this.$route.fullPath, localStorage.getItem('userId'))
        wxshare.successfulShare(this.$route.query)
      }
    }
</script>

<style lang="scss">
  .onthewayWrap{
    background: #c7eefd;
    .backBtn{
      z-index:2;
      width: 35px;
      height: 43.5px;
      position:fixed;
      right:24px;
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
            width: 375px;
            height: auto;
            margin-bottom: 0;
          }
        }
        .startContentWrap{
          width: 100%;
          height: 100%;
          .placeItem{
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 80px;
          }
        }
      .phoneBgdiv{
        width: 365px;
        height: 193.5px;
        margin-top:-5px;
        position: relative;
        .phonePhoto{
          position: absolute;
          width:314.5px;
          height: 173px;
          top:50%;
          left:50%;
          margin-left:-157px;
          margin-top:-84px

        }
      }
      .statusFlag{
        width: 85px;
        height: 16.5px;
        margin-top: 20px;
      }
      .startContent{
        width: 300px;
        height: 183px;
        margin-top: 20px;
      }
      .detailOnTap{
        width: 71px;
        height: 19.5px;
        margin-top: 20px;
      }
    }

  }
</style>
