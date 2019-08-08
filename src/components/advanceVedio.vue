<template>
    <div class="advanceVedio">
       <img class="bgGif" :src="bgGif">
      <audio  autoplay loop id="advanceMp3">
        <source :src="mp3" type="audio/ogg" >
      </audio>
    </div>
</template>

<script>
  import bgGif from '../assets/images/advance.gif'
  import mp3 from '../assets/vedio/advance.mp3'
  import wxshare from '../store/modules/share.js'
    export default {
          data(){
            return {
              bgGif:bgGif,
              mp3:mp3
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
  background:#5b9352;;
  display: flex;
  justify-content: center;
  align-items: center;
  .bgGif{
    width: 100%;
    height: 100%;
  }
}
</style>
