<template>
    <div class="advanceVedio">
       <!--<img class="bgGif" :src="bgGif">-->
      <!--<audio  autoplay loop id="advanceMp3">-->
        <!--<source :src="mp3" type="audio/ogg" >-->
      <!--</audio>-->
      <video style="width: 100%;height: 100%">
        <source :src="mp4" type="video/mp4"  autoplay :poster="poster">
      </video>
    </div>
</template>

<script>
  import bgGif from '../assets/images/advance.gif'
  import mp3 from '../assets/vedio/advance.mp3'
  import mp4 from '../assets/vedio/topicVedio.mp4'
  import wxshare from '../store/modules/share.js'
  import poster from '../assets/vedio/poster.jpg'
    export default {
          data(){
            return {
              bgGif:bgGif,
              mp3:mp3,
              mp4:mp4,
              poster:poster
            }
          },
      created:function(){
        wxshare.wxshare(this.$route.fullPath, localStorage.getItem('userId'))
        wxshare.successfulShare(this.$route.query)
            // let me=this
            // let myMp4=document.getElementById("mp4");
            //
            // let myMp3=document.getElementById("mp3");
            // setInterval(function(){
            //   myMp3.play()
            // },104000)
      }
    }
</script>

<style lang="scss">
.advanceVedio{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .bgGif{
    width: 100%;
    height: 100%;
  }
}
</style>
