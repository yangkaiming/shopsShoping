// pages/frist/frist.js
var ip = require('../ip.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ips: ip.ip,
    fristHot: ['女装内衣', '家具建材', '美妆护肤', '玩具乐器', '电脑办公', '生活美食', '生鲜果蔬'],
    grilList: [],
    currentTab: 0,
    idList: ['5b87c858eea0e41478ea5f7d', '5b87bac2eea0e41478ea5f65', '5b87babeeea0e41478ea5f64', '5b87fb7fc9ea84201cf00ec9', '5b87c86deea0e41478ea5f7e', '5b87bbfbeea0e41478ea5f66', '5b87c4a5eea0e41478ea5f77'],
    goodsList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: ip.ip + '/fristGoods',
      data: {
        shops: '5b87c858eea0e41478ea5f7d',
      },
      success: (res) => {
        let data = res.data
        let arr = []
        for (let i of data) {
          let indexImg = i.indexImg
          indexImg = indexImg.replace(/\\/g, "/");
          arr.push({
            _id: i._id,
            name: i.name,
            indexImg: indexImg,
            salePrice: i.price
          })
        }
        this.setData({
          grilList: arr
        })
      }
    })
  },
  searchName: function () {
    wx.navigateTo({
      url: '../search/search'
    })
  },
  fristChange: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.id
    })
    console.log(e.currentTarget.dataset.id)
    if (this.data.currentTab != 0) {

      wx.request({
        url: ip.ip + '/fristGoods',
        data: {
          shops: this.data.idList[e.currentTarget.dataset.id],
        },
        success: (res) => {
          let data = res.data
          let arr = []
          for (let i of data) {
            let indexImg = i.indexImg
            indexImg = indexImg.replace(/\\/g, "/");
            arr.push({
              _id: i._id,
              name: i.name,
              indexImg: indexImg,
              salePrice: i.price
            })
          }
          this.setData({
            goodsList: arr
          })
        }
      })
    }
  },
  todyPrict: function (e) {
    console.log(e.currentTarget.dataset.ids)
    wx.navigateTo({
      url: '../goods/goods?id=' + e.currentTarget.dataset.ids
    })
  },

  onReady: function () {

  },



})