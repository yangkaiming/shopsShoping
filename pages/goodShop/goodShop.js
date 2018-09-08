var ip = require('../ip.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopsList: [],
    ips: ip.ip,
    shopFrist: ['首页', '全部商品'],
    currentTab: 0,
    _id: '',
    goodList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      _id: options.id
    })
    let _id = options.id
    wx.request({
      url: ip.ip + '/findshops',
      data: {
        _id: _id
      },
      success: (res) => {
        let data = res.data
        let logo = data.logo.replace(/\\/g, "/");
        data.logo = logo
        let backimg = data.backimg.replace(/\\/g, "/");
        data.backimg = backimg
        let img = data.img.join(',')
        img = img.replace(/\\/g, "/");
        img = img.split(',')
        data.img = img
        this.setData({
          shopsList: [data]
        })
      }
    })
  },
  shopFrist: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.id
    })
    if (this.data.currentTab != 0) {
      wx.request({
        url: ip.ip + '/fristGoods',
        data: {
          shops: this.data._id
        },
        success: (res) => {
          for (let data of res.data) {
            let indexImg = data.indexImg.replace(/\\/g, "/");
            data.indexImg = indexImg
          }
          this.setData({
            goodList: res.data
          })
          console.log(this.data.goodList)
        }
      })
    }

  },
  shop_down: function (e) {
    wx.navigateTo({
      url: '../goods/goods?id=' + e.currentTarget.dataset.id,
    })
  }

})