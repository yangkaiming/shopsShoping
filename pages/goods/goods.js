// pages/goods/goods.js
var ip = require('../ip.js')
const app = getApp()

Page({
  data: {
    goodsHot: ['商品', '详情', '推荐'],
    currentTab: 0,
    onChange: 0,
    infoImgList: [],
    ips: ip.ip,
    goodsList: [],
    id: '',
    shopId: '',
    goodsImg: [],
    showModalStatus: false,
    showModal: false,
    normsList: [],
    hotList: [],
    paramList: [],
    lastList: [
      { img: '../img/51.png', name: '店铺' },
      { img: '../img/50.png', name: '客服' },
      { img: '../img/52.png', name: '收藏' },
    ],
    parmaOr: false,
    normas: false,
    goodsNum: 1,
    shopList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    wx.request({
      url: ip.ip + '/fristGoods',
      data: {
        _id: this.data.id
      },
      success: (res) => {
        let data = res.data
        let img = data.img.join(',')
        img = img.replace(/\\/g, "/");
        img = img.split(',')
        if (data.express == 0) {
          data.express = "免运费"
        }
        let arr = res.data.norms.map(item => {
          return {
            key: item.split(':')[0],
            value: item.split(':')[1].split('-')
          }
        })

        let param = []
        for (let i of data.param) {
          param.push(i.split(','))
        }
        this.setData({
          shopList: [res.data],
          goodsImg: img,
          goodsList: [data],
          shopId: data.shops,
          normsList: arr,
          paramList: param
        })
        console.log(this.data.normsList)
      }
    })
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.id
    })
    if (this.data.currentTab != 0) {
      wx.request({
        url: ip.ip + '/fristGoods',
        data: {
          _id: this.data.id
        },
        success: (res) => {
          let data = res.data
          let infoImg = data.infoImg.join(',')
          infoImg = infoImg.replace(/\\/g, "/");
          infoImg = infoImg.split(',')
          this.setData({
            infoImgList: infoImg,

          })
        }
      })
    }
    if (this.data.currentTab != 1) {
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
    }


  },
  //----------------------------------------规格抽屉---------------------------//

  powerDrawer: function (e) {

    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  norms_btn: function (e) {
    var current = e.currentTarget.dataset.status;
    this.nulls(current)
  },
  norms_btns: function (e) {
    console.log(app.globalData.header.Cookie)
    if (app.globalData.header.Cookie.length > 0) {
      wx.request({
        url: ip.ip + '/peopleShop',
        data: {
          shopId: app.globalData.header.Cookie[0]._id,
          name: [...this.data.shopList],
          shopNum: this.data.goodsNum
        },
        success: (res) => {
          wx.showToast({
            title: '商品加入成功',
            icon: 'success',
            duration: 3000,
          })
        }
      })
      var current = e.currentTarget.dataset.status;
      this.nulls(current)
    } else {
      wx.navigateTo({
        url: '../mylogin/mylogin',
      })
    }


  },
  nulls: function (current) {
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    });
    this.animation = animation;
    animation.translateY(240).step();
    this.setData({
      animat: animation.export()
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animat: animation
      })
      //关闭抽屉
      if (current == "close") {
        this.setData(
          {
            showModal: false
          }
        );
      }
    }.bind(this), 200)

    // 显示抽屉
    if (current == "open") {
      this.setData(
        {
          showModal: true
        }
      )
    }

  },

  util: function (currentStatu) {
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    });
    this.animation = animation;
    animation.translateY(240).step();
    this.setData({
      animationData: animation.export()
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation
      })
      //关闭抽屉
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示抽屉
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      )
    }

  },

  todyPrict: function (e) {
    wx.navigateTo({
      url: '../goods/goods?id=' + e.currentTarget.dataset.ids,
    })
  },
  shop_frists: function (e) {
    wx.navigateTo({
      url: '../goodShop/goodShop?id=' + e.currentTarget.dataset.id,
    })
  },
  namesAll: function (e) {
    console.log(e.currentTarget.dataset.id)
    this.setData({
      onChange: e.currentTarget.dataset.id
    })
  },
  //-----------------------------------------------------底部跳转---------------------------------//
  goTopShop: function (e) {  // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  },
  onPageScroll: function (e) {
    if (e.scrollTop > 120) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
    if (e.scrollTop > 444 && this.data.currentTab == 0) {
      wx.showToast({
        title: '加载完成',
        icon: 'loading',
        duration: 600
      })
    }
  },
  showAllMess: function (e) {
    wx.navigateTo({
      url: '../people/people?id=' + e.currentTarget.dataset.id
    })
  },
  //--------------------------------------------消息-----------------------------------//
  messagePeople: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../messageShop/messageShop?id=' + e.currentTarget.dataset.id
    })
  },
  delBtn: function () {
    if (this.data.goodsNum > 1) {
      this.setData({
        goodsNum: this.data.goodsNum - 1
      })
    }
  },
  addBtn: function () {
    if (this.data.goodsNum < 5) {
      this.setData({
        goodsNum: this.data.goodsNum + 1
      })
    }
  }
})