var ip = require('../ip.js')
const app = getApp()
Page({

  data: {
    isLogin: true,
    shopShop: [],
    ips: ip.ip,
    shopNull: false,
    prict: '',
    allPrices: '',
    num: false,
    shops: 1,
    goodsNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: ip.ip + '/fristGoods',
      data: {
        rows: 6
      },
      success: (res) => {
        let data = res.data.rows
        let arrs = []
        for (let i of data) {
          let indexImg = i.indexImg.replace(/\\/g, "/");
          arrs.push({ _id: i._id, indexImg: indexImg, price: i.price, shops: i.shops, name: i.name })
        }
        this.setData({
          hotList: arrs,
        })
      }
    })
  },
  goLogin: function () {
    wx.navigateTo({
      url: '../mylogin/mylogin',
    })
  },
  your_want: function (e) {
    wx.navigateTo({
      url: '../goods/goods?id=' + e.currentTarget.dataset.ids,
    })
  },
  onShow: function () {
    if (app.globalData.header.Cookie.length > 0) {
      wx.request({
        url: ip.ip + '/findPeopleShop',
        data: {
          shopId: app.globalData.header.Cookie[0]._id
        },
        success: (res) => {
          if (res.data.length > 0) {
            this.setData({
              shopNull: true,
              num: true
            })
          }
          let arrShop = []
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
            shopShop: res.data,
            allPrices: strNum,
            goodsNum: numNum
          })
          console.log(this.data.shopShop)
        }
      })
      this.setData({
        isLogin: false
      })
    }
  },
  //-------------------------------------商品增加----------------------------//
  delBtn: function (e) {
    if (this.data.goodsNum > 1) {
      let arr = this.data.shopShop
      let index = e.currentTarget.dataset.id    //下标
      arr[index].shopNum = arr[index].shopNum - 0 - 1
      let allNumers = 0
      let allP = 0
      for (let i of arr) {
        allNumers += i.shopNum - 0
        allP += (i.shopNum - 0) * parseInt(i.name[0].salePrice - 0)
      }
      this.setData({
        shopShop: [...arr],
        allPrices: allP,
        goodsNum: allNumers
      });
    }
  },
  addBtn: function (e) {
    let arr = this.data.shopShop
    let index = e.currentTarget.dataset.id    //下标
    arr[index].shopNum = arr[index].shopNum - 0 + 1
    let allNumers = 0
    let allP = 0
    for (let i of arr) {
      allNumers += i.shopNum - 0
      allP += (i.shopNum - 0) * parseInt(i.name[0].salePrice - 0)
    }
    this.setData({
      shopShop: [...arr],
      allPrices: allP,
      goodsNum: allNumers
    });
  },
  delShops(e) {
    wx.showModal({
      title: '警告',
      content: '是否删除该商品',
      success: (res) => {
        wx.request({
          url: ip.ip + '/delPeopleShop',
          data: {
            _id: e.currentTarget.dataset.id
          },
          success: (res) => {
            let shop = this.data.shopShop
            shop.splice(e.currentTarget.dataset.ids,1)
            this.setData({
              shopShop: [...shop]
            })
          }
        })

      }
    })

  },
  //----------------------------------订单确认--------------------------------//
  goMoney: function (e) {
    if (this.data.goodsNum > 0) {
      wx.navigateTo({
        url: '../moneyNull/moneyNull?id=' + e.currentTarget.dataset.id,
      })
    }
  } 
})