//index.js
//获取应用实例
const app = getApp()
var ip = require('../ip.js')

Page({
  data: {
    imgUrls: [
      ip.ip + '/imgs/5.jpg',
      ip.ip + '/imgs/7.jpg',
      ip.ip + '/imgs/8.jpg',
      ip.ip + '/imgs/9.jpg',
      ip.ip + '/imgs/10.jpg',
      ip.ip + '/imgs/12.jpg',
      ip.ip + '/imgs/13.jpg',
    ],
    interval: 2000,
    duration: 1000,
    fristImg: [
      { img: ip.ip + '/fristImg/1.png', name: '天猫' },
      { img: ip.ip + '/fristImg/2.png', name: '聚划算' },
      { img: ip.ip + '/fristImg/3.png', name: '买多多' },
      { img: ip.ip + '/fristImg/4.png', name: '百度外卖' },
      { img: ip.ip + '/fristImg/5 (2).gif', name: '手机充值' },
      { img: ip.ip + '/fristImg/6.png', name: '天猫超市' },
      { img: ip.ip + '/fristImg/7.png', name: '属促' },
      { img: ip.ip + '/fristImg/8.png', name: '贷款' },
      { img: ip.ip + '/fristImg/9.png', name: '拍一拍' },
      { img: ip.ip + '/fristImg/10.png', name: '全部分类' }
    ],
    shopMessageImg: [],
    messageName: [],
    ips: ip.ip,
    "expireTime": "2018-9-1 15:37:08",
    clock: '',
    timeShop: [],
    goodGoods: [],
    todyShops: [],
  },
  onLoad: function () {
    var date = new Date();
    var year = date.getFullYear(); //获取当前年份   
    var mon = date.getMonth() + 1; //获取当前月份   
    var da = date.getDate(); //获取当前日   
    var h = date.getHours() + 1; //获取小时   
    var m = date.getMinutes(); //获取分钟   
    var s = date.getSeconds(); //获取秒   
    let nowTime = year + '-' + mon + '-' + da + ' ' + h + ':' + m + ':' + s;
    this.setData({
      expireTime: nowTime
    })
    wx.request({
      url: ip.ip + '/fristGoods',
      data: {
        rows: 4
      },
      success: (res) => {
        let imgs = []
        for (let i of res.data.rows) {
          let img = i.indexImg
          img = img.replace(/\\/g, "/");
          imgs.push({ _id: i._id, name: i.name, img: img })
        }
        this.setData({
          shopMessageImg: imgs
        })
      }
    }),
      wx.request({
        url: ip.ip + '/fristGoods',
        data: {
          shops: "5b87bac2eea0e41478ea5f65"
        },
        success: (data) => {
          let arr = []
          for (let i of data.data) {
            let indexImg = i.indexImg
            indexImg = indexImg.replace(/\\/g, "/");
            arr.push({ _id: i._id, img: indexImg, prict: i.price, nowPrict: i.salePrice, shops: i.shops })
          }
          this.setData({
            messageName: arr
          })
        }
      }),
      this.count_down();
    wx.request({
      url: ip.ip + '/fristGoods',
      data: {
        shops: "5b87fb7fc9ea84201cf00ec9"
      },
      success: (data) => {
        let arr = []
        for (let i of data.data) {
          let indexImg = i.indexImg
          indexImg = indexImg.replace(/\\/g, "/");
          arr.push({ _id: i._id, img: indexImg, prict: i.price, nowPrict: i.salePrice })
        }
        this.setData({
          timeShop: arr
        })
      }
    }),
      wx.request({
        url: ip.ip + '/fristGoods',
        data: {
          shops: '5b87c858eea0e41478ea5f7d',
          rows: 2
        },
        success: (res) => {
          let arr = []
          for (let i of res.data.rows) {
            let indexImg = i.indexImg
            indexImg = indexImg.replace(/\\/g, "/");
            arr.push({ _id: i._id, img: indexImg })
          }
          this.setData({
            goodGoods: arr
          })

        }
      }),
      wx.request({
        url: ip.ip + '/findshops',
        data: {
          rows: 6
        },
        success: (res) => {
          let arr = []
          for (let i of res.data.rows) {
            let indexImg = i.img[0]
            indexImg = indexImg.replace(/\\/g, "/");
            let logo = i.logo.replace(/\\/g, "/");
            arr.push({ _id:i._id, img: logo, name: i.name, images: indexImg })
          }
          this.setData({
            todyShops: arr
          })
        }
      })
  },

  /* 毫秒级倒计时 */
  count_down: function () {
    var that = this
    //2016-12-27 12:47:08 转换日期格式
    var a = that.data.expireTime.split(/[^0-9]/);
    //截止日期：日期转毫秒
    var expireMs = new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
    //倒计时毫秒
    var duringMs = expireMs.getTime() - (new Date()).getTime();
    // 渲染倒计时时钟
    that.setData({
      clock: that.date_format(duringMs)
    });

    if (duringMs <= 0) {
      that.setData({
        clock: "秒杀已结束！"
      });
      // timeout则跳出递归
      return;
    }
    setTimeout(function () {
      // 放在最后--
      duringMs -= 10;
      that.count_down();
    }
      , 10)
  },
  /* 格式化倒计时 */
  date_format: function (micro_second) {
    var that = this
    // 秒数
    var second = Math.floor(micro_second / 1000);
    // 小时位
    var hr = Math.floor(second / 3600);
    // 分钟位
    var min = that.fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
    // 秒位
    var sec = that.fill_zero_prefix(second % 60);// equal to => var sec = second % 60;
    return hr + ":" + min + ":" + sec + " ";
  },

  /* 分秒位数补0 */
  fill_zero_prefix: function (num) {
    return num < 10 ? "0" + num : num
  },
  //----------------------------------------------------返回顶部-----------------------//
  goTop: function (e) {  // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  },
  // 获取滚动条当前位置
  onPageScroll: function (e) {
    if (e.scrollTop > 80) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },
  searchName: function () {
    wx.navigateTo({
      url: '../search/search'
    })
  },
  todyPrict: function (e) {
    wx.navigateTo({
      url: '../goods/goods?id=' + e.currentTarget.dataset.ids,  
    })
  },
  todyShops: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../goodShop/goodShop?id=' + e.currentTarget.dataset.id,
    })
  },
})
