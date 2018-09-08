var ip = require('../ip.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [
      { img: '../img/11.png', name: '待付款' },
      { img: '../img/13.png', name: '待发货' },
      { img: '../img/14.png', name: '待收货' },
      { img: '../img/15.png', name: '待评价' },
      { img: '../img/16.png', name: '退款/售后' },
    ],
    setList: [
      { img: '../img/22.png', name: '钱包' },
      { img: '../img/23.png', name: '积分' },
      { img: '../img/24.png', name: '评价' },
      { img: '../img/25.png', name: '造物节' },
      { img: '../img/26.png', name: 'vip' },
      { img: '../img/27.png', name: '添加工具' },
      { img: '../img/28.png', name: '余额' },
      { img: '../img/29.png', name: '足迹' },
      { img: '../img/21.png', name: '设置' },
      { img: '../img/20.png', name: '更多' },
    ],
    isLogin: [],
    isLogins: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


  },
  onShow: function () {
    if (app.globalData.header.Cookie.length > 0) {
      this.setData({
        isLogin: app.globalData.header.Cookie,
        isLogins: false,
      })
    }
  },

  login_btn: function () {
    wx.navigateTo({
      url: '../mylogin/mylogin'
    })
  }


})