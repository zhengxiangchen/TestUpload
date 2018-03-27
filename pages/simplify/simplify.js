// pages/simplify/simplify.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    beforePicture : '',
    afterPicture : '',
    hideAnimation: {},
    showPic: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      beforePicture: options.beforePicture,
      afterPicture: options.afterPicture,
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
    var that = this;
    that.hidePicture();
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
  //点击重新上传按钮
  reUpload: function(){
    //返回上一页面重新选择
    wx.navigateBack({
      
    })
  },
  //动画的方式隐藏图片
  hidePicture: function () {
    var that = this;
    var animation = wx.createAnimation({
      duration: 2000,
      timingFunction: 'ease-in-out',
    })
    animation.opacity(0).scale(0.1, 0.1).step({ duration: 1500 })
    that.setData({
      hideAnimation: animation.export()
    })
    setTimeout(function () {
      that.setData({
        showPic: true
      })
    }, 2000);
  },

  //点击保存图片按钮
  save: function () {
    var that = this;
    wx.getSetting({
      success(res){
        if (!res.authSetting['scope.writePhotosAlbum']){
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              // 用户已经同意小程序使用保存图片功能，后续调用 wx.saveImageToPhotosAlbum 接口不会弹窗询问
            },
            fail(){
              wx.showModal({
                title: '提示',
                content: '无保存图片的权限,点击"确定"按钮重新设置权限。',
                success: function (res) {
                  if (res.confirm) {
                    wx.openSetting({
                      
                    })
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            }
          })
        }else{
          wx.downloadFile({
            url: that.data.afterPicture,
            success: function (res) {
              var path = res.tempFilePath
              wx.saveImageToPhotosAlbum({
                filePath: path,
                success(res) {
                  wx.showToast({
                    title: '保存成功',
                    icon: 'success',
                    duration: 2000,
                    success:function(){
                      setTimeout(function () {
                        //要延时执行的代码
                        wx.switchTab({
                          url: '/pages/index/index'
                        })
                      }, 2000)
                    }
                  })
                }
              })
            },
            fail(res) {
              console.log("失败了");
              console.log(res);
            }
          })
        }
      }
    })  
  },

  //点击图片预览效果
  preview(){
    wx.previewImage({
      urls: [this.data.afterPicture],
    })
  },

  //长按图片弹出菜单
  longtap(){
    var that = this;
    wx.showActionSheet({
      itemList: ['保存图片','重新上传'],
      success(res){
        if (res.tapIndex == 0){
          that.save();
        }
        if (res.tapIndex == 1){
          that.reUpload();
        }
      }
    })
  }
})