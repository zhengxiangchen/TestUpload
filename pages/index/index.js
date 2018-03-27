//index.js  
//获取应用实例  
var app = getApp();

Page({
  data: {
    tempFilePaths: ''
  },
  onLoad: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
     * 用户点击右上角分享
     */
  onShareAppMessage: function () {

  },
  //选择图片
  chooseimage: function () {
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        _this.setData({
          tempFilePaths: res.tempFilePaths,
        })
      }
    })
  },
  //点击简化图片按钮
  simplify: function(){
    var that = this;
    wx.showLoading({
      title: '图片上传中',
    })
    //上传图片至后台进行处理
    var filePath = that.data.tempFilePaths;
    wx.uploadFile({
      url: 'http://192.168.1.205:8080/api_v1/wx/picture/upload_test', //仅为示例，非真实的接口地址
      filePath: filePath[0],
      name: 'picture',
      formData: {
        openid: app.globalData.openId
      },
      success: function (res) {
        var data = res.data;
        wx.hideLoading();
        //返回处理后的图片资源
        wx.navigateTo({
          url: '/pages/metrix/metrix?beforePicture=' + that.data.tempFilePaths + "&afterPicture=" + data,
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '服务器维护中',
          image: '/images/tip.png',
          duration: 3500
        })
      }
    })
  },
})