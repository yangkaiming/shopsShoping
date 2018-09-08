var ip = require('../ip.js')

Page({
  data: {

  },

  onLoad: function (options) {

  },
  refSubmit: function (e) {
    if (e.detail.value.uname !== "") {
      wx.request({
        url: ip.ip + '/refAdd',
        data: {
          uname: e.detail.value.uname,
          pwd: e.detail.value.pwd,
          nickName: e.detail.value.nickName
        },
        success: (res) => {
          e.detail.value.uname = ""
          e.detail.value.pwd = ""
          e.detail.value.nickName = ""
          wx.navigateTo({
            url: '../mylogin/mylogin',
          })
        }
      })
    }
  }

})