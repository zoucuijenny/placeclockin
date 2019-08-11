<template>
  <div class="albumWrap" :style="albumWrapStyle">
    <img :src="logo" alt="" class="logo">
    <img class="backBtn" :src="btnBack" @click="back()">
      <div class="pageContent">
        <div class="topBanner">
            <img :src="bannerInfo.url" class="bannerPhoto">
            <div class="titleWrap">
              <div class="title">{{bannerInfo.title}}</div>
              <div class="subtitle">{{bannerInfo.subtitle}}</div>
            </div>
            <div class="seedWrap">
              <img :src="seed" class="seed">
              <span class="title">{{bannerInfo.seedCount}}</span>
            </div>
        </div>
        <div class="listContent">
          <div class="listItem" v-for="(item,index) in listContent" :item="item" :index="index">
            <div class="uploadTime">
              {{item.date}}
            </div>
            <div class="photoList"  >
              <div class="photoItem" v-for="(photoItem,i) in item.info" :item="photoItem" :index="i">
                <img :src="photoItem.url" class="photo" @click.prevent="showbigImg(photoItem.url)">
                <div class="photoInfo"  >
                  <div class="lovedWrap">
                    <img :src="loved" alt="" class="loved" v-if="photoItem.islike===1">
                    <img :src="toLove" alt="" class="loved" v-if="photoItem.islike===0">
                    <span class="lovedNumber">{{ photoItem.likes}}</span>
                  </div>
                  <div class="chooseMe"  @click.prevent="chooseMe(photoItem.pid)" >
                    <img :src="chooseMeBtn" class="chooseMeBtn" >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <!--点击图片放大查看-->
    <div class="showBigImgBox"  v-show="bigImgShow">
      <div class="bigImgBox">
        <img class="bigImg" :src="bigImgUrl" >
        <img class='closeBtn' :src="closeBtn" @click="closeBigImgBox">
      </div>
    </div>
  </div>
</template>

<script>
  import  bg from '../assets/images/bannerContentbg.png'
  import logo from '../assets/images/logored.png'
  import  photo from '../assets/images/photo.jpg'
  import  albumTop from '../assets/images/albumTop.jpg'
  import btnBack from '../assets/images/btnback.png'
  import  closeBtn from '../assets/images/closeBtn.png'
  import seed from '../assets/images/seed.png'
  import loved from '../assets/images/loved.png'
  import toLove from '../assets/images/toLove.png'
  import chooseMeBtn from '../assets/images/chooseMe.png'

  import { createNamespacedHelpers } from 'vuex'
  const { mapState } = createNamespacedHelpers('data/')
    export default {
     data(){
       return{
         bg:bg,
         closeBtn:closeBtn,
         logo:logo,
         photo:photo,
         btnBack:btnBack,
         placeId:null,
         bannerInfo:{
           url: albumTop,
           title: '云中漫步武陵山',
           subtitle: '挥洒好伐啦诗歌朗诵',
           seedCount: 0
         },
         seed:seed,
         loved:loved,
         toLove:toLove,
         chooseMeBtn:chooseMeBtn,
         albumWrapStyle:{
           backgroundImage:'url('+bg+')',
           backgroundRepeat:'no-repeat',
           backgroundSize:'100% 100%',
           backgroundPosition:'0,0'
         },
         bigImgUrl:'',
         bigImgShow:false,
         listContent:[
           {
             date:'8月14',
             info:[
               {
                 pid:'',
                 url:'',
                 likes:null,
                 place:'',
                 isLike:0
               },
               {
                 pid:'',
                 url:'',
                 likes:null,
                 place:'',
                 isLike:0
               }
             ]
           }
         ]
       }
     },
      computed: {
        ...mapState({
          imgBaseUrl: state => state.imgBaseUrl,
          albumTopData:state=>state.albumTopData
        })
      },
      methods:{
        back:function(){
          this.$router.push({name:'ontheway'})
        },
        showbigImg:function(url){
          let me=this
          me.bigImgShow=true
          me.bigImgUrl=url
       },
        closeBigImgBox:function(){
          let me=this
          me.bigImgShow=false
        },
        getList:function () {
          let me=this
          me.$axios.get('/api/onroad/picture',{
            params:{place:me.$route.params.place},
            hearders:{token:sessionStorage.getItem('userId')}
          })
            .then((res)=>{
              if(res.data.status===0){
                me.listContent=res.data.data
              }else{
                me.$toast.fail(res.data.msg)
              }
            })
            .catch(()=>{
              console.log(err)
            })
        },
        chooseMe:function(pid){
          let me=this
          me.$axios.get('/api/onroad/addlike',{
            params:{pid:pid},
            headers:{token:sessionStorage.getItem('userId')}
        })
            .then((res)=>{
              if(res.data.status===0){
                me.getList()
              }else{
                me.$toast.fail(res.data.msg)
              }
            })
            .catch(()=>{
              console.log(err)
            })
        },
        getViews:function(){
          let me=this
          me.$axios.get('/api/onroad/Pageviews',{
            params:{place:me.$route.params.place},
            hearders:{token:sessionStorage.getItem('userId')}
            })
            .then((res)=>{
              if(res.data.status===0){
              }
            })
            .catch(()=>{
                console.log(err)
            })
        }
      },
      created:function(){
       let me=this
        me.getList()
        me.getViews()
        for(let item of me.albumTopData){
         if(item.place===me.$route.params.place){
           me.bannerInfo.url=item.url
           me.bannerInfo.title=item.title,
           me.bannerInfo.subtitle=item.description,
           me.bannerInfo.seedCount= item.likes
           me.bannerInfo.islike=item.islike
         }
        }
      }
    }
</script>

<style lang="scss">
  .albumWrap{
    height: 100%;
    width: 100%;
    padding-top:67.5px;
    .logo{
      position: absolute;;
      z-index:2;
      width: 161px;
      height: 25px;
      left:20px;
      top:20px;
    }
    .backBtn{
      z-index:2;
      width: 35px;
      height: 43.5px;
      position:fixed;
      right:10px;
      top:13px;
    }
    .pageContent{
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .topBanner{
        width: 95.8%;
        position: relative;
        margin-bottom: 20px;
        .bannerPhoto{
          width: 100%;
          height: auto;
        }
        .titleWrap{
          color:#fff;
          position: absolute;
          left:10px;
          bottom:15px;
          width: 250px;
          .title{
            font-size:16px;
            font-weight: bold;
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;

          }
          .subTitle{
            font-size: 12px;
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;
          }
        }
        .seedWrap{
          color:#fff;
          position: absolute;
          right:25px;
          bottom:25px;
          font-size: 10px;
          .seed{
            width: 15px;
            height: 8px;
          }
        }
      }
      .listContent{
        width:359.5px;
        .listItem{
          margin-bottom:20px;
          .uploadTime{
            color:#07c160;
            font-size: 15px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .photoList{
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: flex-start;
            flex-wrap: wrap;
            .photoItem{
              background: #fff;
              width:47%;
              margin-bottom: 10px;
              .photo{
              width:100%;
              height: auto;
              }
              .photoInfo{
                display: flex;
                height: 30px;
                width: 153px;
                margin-left: 10px;
                position: relative;
                .lovedWrap{
                  width: 80px;
                  color:#f4871D;
                  position: absolute;
                  left:5px;
                  bottom:8px;
                  .loved{
                    width: 14.5px;
                    height: 13px;
                    margin-right:5px;
                  }
                }
                .chooseMe{
                  width:40.5px;
                  position: absolute;
                  z-index:1;
                  right:5px;
                  bottom:5px;
                  display: block;
                  .chooseMeBtn{
                    width:40.5px;
                    height:18.5px;
                  }
                }
              }
            }
          }
        }
      }
    }
    .showBigImgBox{
      z-index:10;
      position:fixed;
      top:0;
      left:0;
      width: 100%;
      height: 100%;
      background-color:rgba(0,0,0,0.5) ;
      display: flex;
      justify-content: center;
      align-items: center;
      .bigImgBox{
        width: 78%;
        height:auto;
        padding-top:40px;
        /*margin-top:112.5px;*/
        position:relative;
        display: flex;
        .closeBtn{
          width: 22.5px;
          height: 40.5px;
          position: absolute;
          right:20px;
          top:0;
        }
        .bigImg{
          width: 295px;
          height:210px;
        }
      }
    }
  }

</style>
