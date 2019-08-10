<template>
  <div id="app">
    <!--<img class="musicIcon" :src="musicIcon" alt=""  @click="togglePlay()">-->
    <!--<audio  autoplay loop id="mp3" >-->
      <!--<source :src="topicMusic" type="audio/ogg" >-->
    <!--</audio>-->
    <router-view/>
  </div>
</template>

<script>
  import topicMusic from './assets/vedio/clockTopic.mp3'
  import musicplay from './assets/images/musicPlay.png'
  import musicPase from './assets/images/musicPase.png'
  import wxshare from './store/modules/share.js'

export default {
  name: 'App',
  data(){
    return{
      topicMusic:topicMusic,
      musicPase:musicPase,
      musicplay:musicplay,
      musicIcon:musicPase,
    }
  },
  methods:{
    togglePlay(){
      let me=this
      let  myVideo=document.getElementById("mp3");
      if (myVideo.paused){
        myVideo.play();
        me.musicIcon=me.musicPase
      } else{
        myVideo.pause();
        me.musicIcon=me.musicplay
      }
    },
  },
  created:function () {
    wxshare.wxshare(this.$route.fullPath, sessionStorage.getItem('userId'))
  // this.togglePlay()

  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*display: flex;*/
  /*justify-content: center;*/
  /*align-items: center;*/
  /*height: 100%;*/
  /*width: 100%;*/
  /*background:#5b9352;*/
  .musicIcon{
    width: 25px;
    height: 25px;
    border-radius: 25px;
    position: fixed;
    top:70px;
    right: 10px;
    z-index: 100;
    //background: red;
  }
}
</style>
