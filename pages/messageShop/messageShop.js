var ip = require('../ip.js')
var app = getApp()
Page({
  data: {
    ips: ip.ip,
    messsImg: [],
    shopId: '',
    inputValue: '',
    clearValue: '',
    people: []
  },


  onLoad: function (options) {
    wx.request({
      url: ip.ip + '/fristGoods',
      data: {
        _id: options.id
      },
      success: (res) => {
        let data = res.data
        let indexImg = data.indexImg.replace(/\\/g, "/");
        data.indexImg = indexImg
        this.setData({
          messsImg: [data],
          shopId: data.shops
        })
      }
    })
  },
  goback: function (e) {
    wx.navigateTo({
      url: '../goodShop/goodShop?id=' + e.currentTarget.dataset.id,
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  addbtn: function () {
    this.location()
  },
  onShow: function () {
    this.location()
  },
  location() {
    let arrs = this.data.inputValue
    let value = wx.getStorageSync("keys")
    wx.setStorage({
      key: 'keys',
      data: [...value, arrs],
      success: () => {
        this.setData({
          people: value,
          clearValue: ''
        })
      }
    })
  }
})