// pages/discover/discover.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHideLoadMore : false,
    items: [],
    isHideNoMore:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://www.gzitrans.cn/api_v1/wx/discover/getDiscoverList',
      success: function (res) {
        that.setData({
          items: res.data
        })
      },
      fail: function(res){
        that.setData({
          isHideLoadMore:true
        })
        wx.showToast({
          title: '服务器维护中',
          image:'/images/tip.png',
          duration:3500
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

  //下拉刷新
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //模拟加载
    var that = this;
    wx.request({
      url: 'https://www.gzitrans.cn/api_v1/wx/discover/getDiscoverList',
      success: function (res) {
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
        that.setData({
          items: res.data
        })
      }
    })
  },


  //滑动到底部触发加载更多
  onReachBottom: function () {
    var that = this;
    that.setData({
      isHideLoadMore: false
    })

    wx.request({
      url: 'https://www.gzitrans.cn/api_v1/wx/discover/getMoreDiscover',
      data:{
        itemsLength: that.data.items.length
      },
      success: function (res) {
        if (res.data.length == 0){
          console.log("没有数据可以加载了");
          that.setData({
            isHideLoadMore: true,
            isHideNoMore:false
          })
        }else{
          for (var i = 0; i < res.data.length; i++){
            //console.log(res.data[i])
            that.data.items.push(res.data[i]);
          }
          var allitem = that.data.items;
          that.setData({
            isHideLoadMore: true,
            items : allitem
          })
        }
      }
    })
  },

  //发现页点击某个图片事件
  toOneDiscover: function (event) {
    var id = event.currentTarget.id;
    wx.navigateTo({
      url: '/pages/onediscover/onediscover?id=' + id,
    })
  }


  
})