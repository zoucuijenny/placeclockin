import axios from 'axios'
import wx from 'weixin-js-sdk';
var host = 'http://122.112.221.15:9900'
var shareDomain = 'http://www.baltictravellerservice.com'
var shareUrl = 'http://www.baltictravellerservice.com/?beforUserId='

let isIPhone = () => {
  const uag = window.navigator.userAgent;
  let _isIPhone = true;
  if (uag.indexOf('Android') > -1 || uag.indexOf('Adr') > -1) {
    _isIPhone = false;
  }
  return _isIPhone;
};

export default {

  wxshare(url, userId){

    if (!userId){
       return
      }
  url = url.split('#')[0]
  console.log('********************************')
  console.log(url)
  console.log(userId)

  axios.get(host + '/api/share?url='+ shareDomain + url + '&userId='+userId).then(function ({data}) {
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: data.data.appid, // 必填，公众号的唯一标识
      timestamp: data.data.timestamp, // 必填，生成签名的时间戳
      nonceStr: data.data.nonceStr, // 必填，生成签名的随机串
      signature: data.data.signature,// 必填，签名
      jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'] // 必填，需要使用的JS接口列表
    })
    url = shareDomain + url

    wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
      wx.updateAppMessageShareData({
        title: '美丽重庆打卡季，偶遇惊喜好礼', // 分享标题
        desc: '渝快生活，重庆农商行带您出行！打卡美丽重庆，还有机会领取景区门票、酒店住宿、现金红包！', // 分享描述
        link: shareUrl + userId, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: 'http://qn.baltictravellerservice.com/sharePic.jpg', // 分享图标
        success: function () {
          console.log("分享成功")
        }
      }),
      wx.updateTimelineShareData({
        title: '美丽重庆打卡季，偶遇惊喜好礼', // 分享标题
        desc: '渝快生活，重庆农商行带您出行！打卡美丽重庆，还有机会领取景区门票、酒店住宿、现金红包！', // 分享描述
        link: shareUrl + userId,  // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: 'http://qn.baltictravellerservice.com/sharePic.jpg', // 分享图标
        success: function () {
          console.log("分享成功")
        }
      })
      wx.error(function(res){
        alert(res.data)
      });

    });


    })
  },

  successfulShare(query) {
    if (!query.hasOwnProperty('beforUserId')) {
      return
    }
    let userId = query.beforUserId
    axios.get(host + '/api/share/sucess?beforUserId=' + userId).then(function (data) {
      if (data.status === 0) {
        console.log("加次数成功")
      } else {
        console.log(data.msg)
      }
    })
  }


}


