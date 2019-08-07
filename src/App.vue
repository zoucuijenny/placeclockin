<template>
  <div id="app">
    <div class="musicIcon"></div>
    <!--<img class="musicIcon" :src="musicIcon" alt="">-->
    <audio  autoplay loop id="mp3">
      <source :src="topicMusic" type="audio/ogg" >
    </audio>
    <router-view/>
  </div>
</template>

<script>
  import topicMusic from './assets/vedio/clockTopic.mp3'
export default {
  name: 'App',
  data(){
    return{
      topicMusic:topicMusic,
     // musicIcon:musicIcon,
    }
  },
  created:function () {
    let  myVideo=document.getElementById("mp3");
    function playPause()
    {
      if (myVideo.paused){
        myVideo.play();
      } else{
        myVideo.pause();
      }
    }

  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .musicIcon{
    width: 25px;
    height: 25px;
    border-radius: 25px;
    position: absolute;
    top:70px;
    right: 10px;
    z-index: 100;
    background: red;
  }
}
</style>
