<template>
    <div class="advanceVedio">
      <video  autoplay  style="width: 100%;height:100%" id="mp4" >
        <source :src="vedio" type="video/mp4" >
      </video>
      <audio  autoplay loop id="mp3">
        <source :src="mp3" type="audio/ogg" >
      </audio>
    </div>
</template>

<script>
  import vedio from '../assets/vedio/advanceVedio.mp4'
  import mp3 from '../assets/vedio/advance.mp3'
    export default {
          data(){
            return {
              vedio:vedio,
              mp3:mp3
            }
          },
      created:function(){
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

<style >
.advanceVedio{
  width: 100%;
  height: 100%;
}
</style>
