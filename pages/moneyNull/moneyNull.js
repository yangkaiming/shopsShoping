var ip = require('../ip.js')
const app = getApp()
Page({


  data: {
    inforList: [],
    ips: ip.ip,
    peopleChan: [],
    allPrices: '',
    goodsNum: 0
  },


  onLoad: function (options) {
    console.log(options.id, app.globalData.header.Cookie)
    this.setData({
      inforList: app.globalData.header.Cookie
    })
    wx.request({
      url: ip.ip + '/findPeopleShop',
      data: {
        shopId: app.globalData.header.Cookie[0]._id
      },
      success: (res) => {
        let strNum = 0
        let numNum = 0
        for (let i of res.data) {
          let indexImg = i.name[0].indexImg.replace(/\\/g, "/");
          i.name[0].indexImg = indexImg
          let allPrict = parseInt(i.name[0].salePrice - 0)
          strNum += allPrict
          let numers = i.shopNum - 0
          numNum += numers
        }
        this.setData({
          peopleChan: res.data,
          allPrices: strNum,
          goodsNum: numNum
        })
        console.log(this.data.peopleChan)
      }
    })
  },
  goMoney: function () {
    wx.showToast({
      title: '购买成功',
      icon: 'success',
      duration: 3000,
    })
    setTimeout(() => {
      wx.showToast({
        title: '购买成功',
        icon: 'success',
        duration: 3000,
        success: () => {
          wx.switchTab({
            url: '../index/index'
          })
        }
      })
    }, 2000)

  },

  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})