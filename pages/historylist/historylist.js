// pages/historylist/historylist.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://www.gzitrans.cn/api_v1/wx/history/getMyHistory',
      data: {
        openId: app.globalData.openId,
      },
      success: function (res) {
        that.setData({
          items: res.data
        })
      },
      fail: function (res) {
        console.log(res);
        wx.showToast({
          title: '服务器维护中',
          image: '/images/tip.png',
          duration: 3500
        })
      }
    })
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //模拟加载
    var that = this;
    wx.request({
      url: 'https://www.gzitrans.cn/api_v1/wx/history/getMyHistory',
      data: {
        openId: app.globalData.openId,
      },
      success: function (res) {
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
        that.setData({
          items: res.data
        })
      }
    })
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
    return {
      title: 'itrans手绘图像简化站',
      desc: '简化你的世界',
      path: '/pages/discover/discover'
    }
  },

  //我的历史页点击某个图片事件
  onehistoryinfo: function (event) {
    var id = event.currentTarget.id;
    wx.navigateTo({
      url: '/pages/onehistoryinfo/onehistoryinfo?id=' + id,
    })
  },

  //长按图片弹出删除菜单
  toDelete: function (event) {
    var that = this;
    var id = event.currentTarget.id;
    wx.showActionSheet({
      itemList: ['删除'],
      success(res) {
        that.delete(id);
      }
    })
  },

  //删除上传记录
  delete: function (id) {
    var that = this;
    wx.request({
      url: 'https://www.gzitrans.cn/api_v1/wx/history/deleteOneHistory',
      data: {
        pictureUploadLogsId: id,
      },
      success: function (res) {
        wx.showToast({
          icon: 'none',
          title: '删除成功',
        })
        setTimeout(function () {
          wx.request({
            url: 'https://www.gzitrans.cn/api_v1/wx/history/getMyHistory',
            data: {
              openId: app.globalData.openId,
            },
            success: function (res) {
              that.setData({
                items: res.data
              })
            },
            fail: function (res) {
              console.log(res);
              wx.showToast({
                title: '服务器维护中',
                image: '/images/tip.png',
                duration: 3500
              })
            }
          })
        }, 1500)
      }
    })

    
  }
})