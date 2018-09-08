var ip = require('../ip.js')
const app = getApp()
Page({
  data: {

  },


  onLoad: function (options) {

  },
  formSubmit: function (e) {
    wx.showToast({
      title:'登陆中',
      icon: 'loading',
      duration: 3000,
    })
    setTimeout(() => {
      wx.request({
        url: ip.ip + '/login',
        data: {
          uname: e.detail.value.uname,
          pwd: e.detail.value.pwd,
        },
        method: 'POST',
        success: (res) => {
          if (res.data.length > 0) {
            app.globalData.header.Cookie = res.data
            wx.showToast({
              title: '登陆中',
              icon: 'loading',
              duration: 3000,
              success: function () {
                wx.navigateBack({
                  // url: '../login/login',
                })
              }
            })

          }
        }
      })
    }, 2000)
  },
  refBtn: function () {
    wx.navigateTo({
      url: '../reg/reg',
    })
  }

})