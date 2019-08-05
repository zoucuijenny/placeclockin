<template>
    <div class="onthewayWrap">
      <img class="backBtn" :src="btnBack" @click="back()">

      <div class="nostartWrap" v-show="!isStart">
        <img class="noStartbg" :src="noStartbg" >
      </div>
      <div class="startWrap" v-show="isStart">
        <img class="startbg" :src="startbg" >
        <div class="startContentWrap">
          <img :src="phoneBg" class="phoneBg">
          <img :src="statusFlag" class="statusFlag">
          <img :src="startContent" class="startContent">
          <img :src="detailOnTap" class="detailOnTap" @click="toNext()">
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
  import startContent from '../assets/images/startContent.png'
  import detailOnTap from '../assets/images/detailOnTap.png'
    export default {
       data(){
         return {
           isStart:true,
           noStartbg:noStartbg,
           startbg:startbg,
           btnBack:btnBack,
           phoneBg:phoneBg,
           statusFlag:statusFlag,
           startContent:startContent,
           detailOnTap:detailOnTap
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
