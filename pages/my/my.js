// pages/my/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    username: "",
    items: [],
    likeNumber:0,
    shareNumber:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: true
    })

    wx.request({
      url: 'http://127.0.0.1:8080/api_v1/wx/myself/getLikeAndShare',
      data:{
        openId: app.globalData.openId
      },
      success:function(res){
        that.setData({
          likeNumber: res.data.likeNumber,
          shareNumber: res.data.shareNumber
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
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:8080/api_v1/wx/myself/getLikeAndShare',
      data: {
        openId: app.globalData.openId
      },
      success: function (res) {
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
        that.setData({
          likeNumber: res.data.likeNumber,
          shareNumber: res.data.shareNumber
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

  //我的上传历史记录
  myHistory: function(){
    wx.navigateTo({
      url: '/pages/historylist/historylist',
    })
  },

  myLike:function(){
    wx.navigateTo({
      url: '/pages/mylikelist/mylikelist',
    })
  },

  showlike:function(){
    wx.showToast({
      icon:'none',
      title: '您作品的总点赞数',
    })

  },

  showshare:function(){
    wx.showToast({
      icon: 'none',
      title: '您作品的总分享数',
    })
  }

})