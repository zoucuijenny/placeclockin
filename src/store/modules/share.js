import axios from 'axios'
import wx from 'weixin-js-sdk';
let  host = 'http://www.zss001.cn'
//不能加/


let  shareUrlDomain = 'http://qn.baltictravellerservice.com'
let  shareUrl =host+ '?beforUserId='

let isIPhone = () => {
  const uag = window.navigator.userAgent;
  let _isIPhone = true;
  if (uag.indexOf('Android') > -1 || uag.indexOf('Adr') > -1) {
    _isIPhone = false;
  }
  return _isIPhone;
};

// function successfulShare() {
//   let userId = sessionStorage.getItem('userId')
//     axios.get(host + '/api/share/sucess?beforUserId='+userId).then(function (data) {
//       if (data.status === 0) {
//         console.log("加次数成功")
//       } else {
//         console.log(data.msg)
//       }
//     })
// }
export default {
  wxshare(url, userId) {
    url = window.location.href
    url = url.split('#')[0]
    if (!userId) {
      return
    }
    if (isIPhone) {
      let iphoneUrl = sessionStorage.getItem('iphonUrl')
      if (!iphoneUrl) {
        sessionStorage.setItem('iphoneUrl', url)
      } else {
        if (url.indexOf('beforUserId') !== -1) {
          sessionStorage.setItem('iphoneUrl', url)
        } else {
          url = iphoneUrl
        }
      }
    }
    axios.get(host + '/api/share?url=' + url + '&userId=' + userId).then(function ({data}) {
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: data.data.appid, // 必填，公众号的唯一标识
        timestamp: data.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.data.nonceStr, // 必填，生成签名的随机串
        signature: data.data.signature,// 必填，签名
        jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData', 'WeixinJSBridge'] // 必填，需要使用的JS接口列表
      })
      url = host + url
      wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
        let me = this
        wx.updateAppMessageShareData({
          title: '美丽重庆打卡季，偶遇惊喜好礼', // 分享标题
          desc: '渝快生活，重庆农商行带您出行！打卡美丽重庆，还有机会领取景区门票、酒店住宿、现金红包！', // 分享描述
          link: shareUrl + userId, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: shareUrlDomain + '/sharePic.jpg', // 分享图标
          success: function () {
            console.log("分享成功")
          }
        }),
          wx.updateTimelineShareData({
            title: '美丽重庆打卡季，偶遇惊喜好礼', // 分享标题
            desc: '渝快生活，重庆农商行带您出行！打卡美丽重庆，还有机会领取景区门票、酒店住宿、现金红包！', // 分享描述
            link: shareUrl + userId,  // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: shareUrlDomain + '/sharePic.jpg', // 分享图标
            success: function () {
              console.log("分享成功")
            },
          })
        wx.error(function (res) {
          console.log(res.data)
        });
      })
    })
  }
}



