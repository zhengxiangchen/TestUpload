// pages/people/people.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    peopleOpenId : '',
    userInfo: {},
    likeNumber: 0,
    shareNumber: 0,
    items: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.data.peopleOpenId = options.peopleOpenId;
    wx.request({
      url: 'https://www.gzitrans.cn/api_v1/wx/people/getPeopleInfo',
      data: {
        peopleOpenId: that.data.peopleOpenId
      },
      success: function (res) {
        that.setData({
          userInfo: res.data,
        })
      }
    })

    wx.request({
      url: 'https://www.gzitrans.cn/api_v1/wx/people/getLikeAndShare',
      data: {
        peopleOpenId: that.data.peopleOpenId
      },
      success: function (res) {
        that.setData({
          likeNumber: res.data.likeNumber,
          shareNumber: res.data.shareNumber
        })
      }
    })

    wx.request({
      url: 'https://www.gzitrans.cn/api_v1/wx/people/getPeopleUploadList',
      data: {
        peopleOpenId: that.data.peopleOpenId,
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
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  showlike: function () {
    var that = this;
    wx.showToast({
      icon: 'none',
      title: that.data.userInfo.nickName + '作品的总点赞数',
    })

  },

  showshare: function () {
    var that = this;
    wx.showToast({
      icon: 'none',
      title: that.data.userInfo.nickName + '作品的总分享数',
    })
  },


  //点击某个图片事件
  onehistoryinfo: function (event) {
    var id = event.currentTarget.id;
    wx.navigateTo({
      url: '/pages/onehistoryinfo/onehistoryinfo?id=' + id,
    })
  }
})