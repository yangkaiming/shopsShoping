var ip = require('../ip.js')

Page({
  data: {
    people: [],
    ips: ip.ip
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    wx.request({
      url: ip.ip + '/fristGoods',
      data: {
        _id: options.id
      },
      success: (res) => {
        let data = res.data
        let img = data.img.join(',')
        img = img.replace(/\\/g, "/");
        img = img.split(',')
        let imgs=[]
        for(let i=0;i<4;i++){
          imgs.push(img[i])
        }
        let arr = []
        arr.push({ name: 't***5', head: '../img/show.png', meaasge: ' 哇，大爱呀！！！！！！之前一直想买一个鞋架，毕竟出门在外，这些小东西还是很有必要买的，看了很久，终于锁定这款，便宜实惠，关键是东西还好用好看结实，快递是非常非常的给力哇！', img: imgs })
        this.setData({
          people: arr,
        })
      }
    })
  },

})