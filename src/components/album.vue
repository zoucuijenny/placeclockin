<template>
  <div class="albumWrap">
    <img class="backBtn" :src="btnBack" @click="back()">
    <img class="bg" :src="bg">
      <div class="pageContent">
        <div class="topBanner">
          <img :src="bannerInfo.url" class="banner">
          <div class="titleWrap">
            <div class="title">{{bannerInfo.title}}</div>
            <div class="title">{{bannerInfo.subtitle}}</div>
          </div>

          <div class="seedWrap">
            <img src="" class="seed">
            <span class="title">{{bannerInfo.seedCount}}</span>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import  bg from '../assets/images/bgAlbum.jpg'
  import  photo from '../assets/images/photo.jpg'
  import  albumTop from '../assets/images/albumTop.jpg'
  import btnBack from '../assets/images/btnback.png'
    export default {
     data(){
       return{
         bg:bg,
         photo:photo,
         btnBack:btnBack,
         bannerInfo:{
           url: albumTop,
           title: '云中漫步武陵山',
           subtitle: '挥洒好伐啦诗歌朗诵',
           seedCount: 0
         }
       }
     },
      methods:{
        back:function(){
          this.$router.back(-1)
        },
      }
    }
</script>

<style lang="scss">
  .albumWrap{
    .backBtn{
      z-index:2;
      width: 35px;
      height: 43.5px;
      position:absolute;
      right:24px;
      top:13px;
    }
    .bg{
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
    .pageContent{
      position: absolute;
      left: 0;
      top: 0;
      z-index: 2;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .topBanner{
        width: 359.5px;
        height: 216px;
        margin-top: 44px;
        .banner{
          width: 359.5px;
          height: 216px;
        }
        .titleWrap{
          color:#fff;
          .title{

          }
          .subTitle{

          }
        }
      }
    }

  }

</style>
