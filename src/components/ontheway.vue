<template>
    <div class="onthewayWrap">
      <img class="backBtn" :src="btnBack" @click="back()">

      <div class="nostartWrap" v-show="!isStart">
        <img class="noStartbg" :src="noStartbg" >
      </div>
      <div class="startWrap" v-show="isStart">
        <img class="startbg" :src="startbg" >
        <div class="startContentWrap">
          <div class="placeItem" v-for="(item,index) in startContent" :item="item" :index="index">
            <img :src="phoneBg" class="phoneBg">
            <img :src="statusFlag" class="statusFlag">
            <img :src="item" class="startContent">
            <img :src="detailButton" class="detailOnTap" @click="toNext(index)">
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import noStartbg from '../assets/images/bgOnwayNostart.jpg'
  import startbg from '../assets/images/bgStart.jpg'
  import btnBack from '../assets/images/btnback.png'
  import phoneBg from '../assets/images/phoneBg.png'
  import statusFlag from '../assets/images/statusFlag.png'
  import detailButton from '../assets/images/detailButton.png'

  import atj from '../assets/images/bannerText/atj.png'
  import dbs from '../assets/images/bannerText/dbs.png'
  import hs from '../assets/images/bannerText/hs.png'
  import hsgsh from '../assets/images/bannerText/hsgsh.png'
  import jfs from '../assets/images/bannerText/jfs.png'
  import wls from '../assets/images/bannerText/wls.png'
  import xns from '../assets/images/bannerText/xns.png'
    export default {
       data(){
         return {
           isStart:true,
           noStartbg:noStartbg,
           startbg:startbg,
           btnBack:btnBack,
           phoneBg:phoneBg,
           statusFlag:statusFlag,
           startContent:[atj,dbs,hs,hsgsh,jfs,wls,xns],
           detailButton:detailButton
         }
       },
      methods:{
        back:function(){
          this.$router.back(-1)
        },
        toNext:function () {
          this.$router.push({name: 'album'})
        }
      }
    }
</script>

<style lang="scss">
  .onthewayWrap{
    .backBtn{
      z-index:2;
      width: 35px;
      height: 43.5px;
      position:absolute;
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
    .startbg{
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
    .startContentWrap{
      width: 100%;
      height: auto;
      position: absolute;
      top: 0;
      left: 0;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 240px;
      .placeItem{
        text-align: center;
      }
    }
    .phoneBg{
      width: 365px;
      height: 193.5px;
      margin-top: 240px;
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
</style>
