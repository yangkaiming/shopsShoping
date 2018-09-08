// pages/search/search.js
var ip = require('../ip.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchinput: '',
    searchList: [],
    hostList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  searchName: function (e) {
    let arrStr = ''
    arrStr+=e.detail.value
    this.setData({
      hostList: [arrStr],
    })
    if (e.detail.value !== "") {

      wx.request({
        url: ip.ip + '/fristGoods',
        data: {
          name: e.detail.value
        },
        success: (res) => {
          if (res.data.length > 0) {
            let arr = []
            for (let i of res.data) {
              arr.push({
                name: i.name,
                _id:i._id
              })
            }
            this.setData({
              searchinput: '',
              searchList: arr
            })
          } else {
            this.setData({
              searchinput: '',
              searchList: [{ name: '抱歉未发现该商品！' }]
            })
          }
        }
      })
    }
  },
  searchLast: function (e) {
    wx.navigateTo({
      url: '../goods/goods?id=' + e.currentTarget.dataset.ids,
    })
  },
})