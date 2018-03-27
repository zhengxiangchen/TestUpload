// pages/metrix/metrix.js
var windowWidth, windowHeight, client;

class CanvasApp {
  constructor() {
    this.yPosArray = Array(50).fill(0);
    this.ctx = wx.createCanvasContext('thirdCanvas');
    this.w = windowWidth;
    this.h = windowHeight;
    this.timer;
  }

  draw() {
    this.ctx.setFillStyle('rgba(0,0,0,.05)');
    this.ctx.fillRect(0, 0, this.w, this.h);
    this.ctx.setFillStyle('rgb(0, 255, 0)');
    this.ctx.setFontSize(10);

    this.yPosArray.map((y, index) => {
      let text = String.fromCharCode(1e2 + Math.random() * 1e2);
      let x = (index * 10) + 10;
      this.ctx.fillText(text, x, y);
      this.ctx.draw(true);
      if (y > 100 + Math.random() * 1e4) {
        this.yPosArray[index] = 0;
      } else {
        this.yPosArray[index] = y + 10;
      }
    });
  }
  run() {
    if (!this.ctx) return;
    var self = this;

    function runAnime() {
      if (self.timer) {
        clearTimeout(self.timer);
      }
      self.draw();
      return self.timer = setTimeout(runAnime, 100);
    }
    runAnime();
  }
  stop() {
    clearTimeout(this.timer);
    this.ctx.clearRect(0, 0, this.w, this.h);
  }
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    beforePicture: '',
    afterPicture: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      beforePicture: options.beforePicture,
      afterPicture: options.afterPicture
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    wx.getSystemInfo({
      success: function (res) {
        windowWidth = res.windowWidth;
        windowHeight = res.windowHeight;
      }
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    client = new CanvasApp('metrix');
    client.run();

    wx.showLoading({
      title: '图片处理中',
    })

    setTimeout(function(){
      wx.hideLoading();
      wx.showToast({
        title: '图片简化完成',
        duration: 1500,
      }),
      client.stop();
      setTimeout(function () {
        wx.redirectTo({
          url: '/pages/simplify/simplify?beforePicture=' + that.data.beforePicture + "&afterPicture=" + that.data.afterPicture,
        })
      }, 2000)
    },5000)
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
    console.log("页面卸载了");
    client.stop();
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