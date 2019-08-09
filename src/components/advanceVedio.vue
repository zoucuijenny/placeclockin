<template>
    <div class="advanceVedio">

      <video  id="mp444" width="375" height="660" controls>
        <source :src="mp444" type="video/mp4" autoplay="autoplay"  poster="http://pic.58pic.com/58pic/13/93/09/83F58PICUiG_1024.jpg" preload="auto">
      </video>

    </div>
</template>

<script>

  import mp444 from '../assets/vedio/topicVedio.mp4'
  import poster from '../assets/vedio/poster.jpg'

  import wxshare from '../store/modules/share.js'
    export default {
      data() {
        return {
          bgGif: bgGif,
          mp3: mp3,
          mp444: mp444,
          poster: poster,
          style: {
            background: 'url(' + poster + ')',
            backgroundSize: '100%,100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '0,0'
          }
        }
      },
      methods: {
        onBridgeReady: function () {
          WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
            document.getElementById('mp444').play();
          });
        }
      },
      created: function () {
        wxshare.wxshare(this.$route.fullPath, localStorage.getItem('userId'))
        wxshare.successfulShare(this.$route.query)
        let me = this
        let myMp4 = document.getElementById("mp444");
        myMp4.play()
        // 兼容微信(微信可以自动播放)
        document.addEventListener("WeixinJSBridgeReady", function () {
          $("mp444")[0].play();
        }, false);
        //第二种方法

        if (typeof WeixinJSBridge === "undefined") {
          document.addEventListener("WeixinJSBridgeReady", me.onBridgeReady, false);
        } else {
          me.onBridgeReady();
        }
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
