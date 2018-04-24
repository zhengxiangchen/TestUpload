// pages/onemylikeinfo/onemylikeinfo.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    oneDiscoverInfo: {},
    likePicture: false,
    viewHeight: 800,
    picurl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      id: options.id
    })
    wx.request({
      url: 'https://www.gzitrans.cn/api_v1/wx/discover/getDiscoverInfo',
      data: {
        pictureUploadLogsId: that.data.id
      },
      success: function (res) {
        that.data.picurl = res.data.simplifyPictureUrl;
        var info = res.data;

        that.setData({
          oneDiscoverInfo: res.data
        })
      }
    }),

    wx.request({
      url: 'https://www.gzitrans.cn/api_v1/wx/discover/toCheckLike',
      data: {
        openId: app.globalData.openId,
        pictureUploadLogsId: that.data.id
      },
      success: function (res) {
        that.setData({
          likePicture: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.getImageInfo({
      src: that.data.picurl,
      success: function (res) {
        //宽高比  
        var ratio = res.width / res.height;
        //计算的高度值  
        var viewHeight = 750 / ratio;
        that.setData({
          viewHeight: viewHeight
        })
      }
    })

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
    var that = this;
    wx.showLoading({
      title: '加载中',
    })

    wx.request({
      url: 'https://www.gzitrans.cn/api_v1/wx/discuss/getMoreDiscuss',
      data: {
        itemsLength: that.data.oneDiscoverInfo.discussInfo.length,
        pictureUploadLogsId: that.data.id
      },
      success: function (res) {
        wx.hideLoading();
        if (res.data.length == 0) {
          console.log("没有数据可以加载了");
        } else {
          for (var i = 0; i < res.data.length; i++) {
            that.data.oneDiscoverInfo.discussInfo.push(res.data[i]);
          }
          var allitem = that.data.oneDiscoverInfo.discussInfo;
          that.setData({
            ['oneDiscoverInfo.discussInfo']: allitem
          })
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    return {
      title: 'itrans手绘图像简化站',
      desc: '简化你的世界',
      path: '/pages/onediscover/onediscover?id=' + that.data.id,
      success: function (res) {
        wx.request({
          url: 'https://www.gzitrans.cn/api_v1/wx/discover/share',
          data: {
            pictureUploadLogsId: that.data.id
          },
          success: function (res) {
            that.setData({
              ['oneDiscoverInfo.shareNumber']: res.data
            })
          }
        })
      },
    }
  },


  //点击图片预览效果
  preview() {
    app.globalData.toLogin = false;
    wx.previewImage({
      urls: [this.data.oneDiscoverInfo.simplifyPictureUrl],
    })
  },

  //长按图片弹出菜单
  longtap() {
    var that = this;
    wx.showActionSheet({
      itemList: ['保存原图', '保存简图'],
      success(res) {
        if (res.tapIndex == 0 || res.tapIndex == 1) {
          that.save(res.tapIndex);
        }
      }
    })
  },

  //点击保存图片按钮
  save: function (e) {
    var that = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              // 用户已经同意小程序使用保存图片功能，后续调用 wx.saveImageToPhotosAlbum 接口不会弹窗询问
            },
            fail() {
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
        } else {
          var picurl;
          if (e == 0) {
            picurl = that.data.oneDiscoverInfo.pictureUrl
          } else if (e == 1) {
            picurl = that.data.oneDiscoverInfo.simplifyPictureUrl
          }
          wx.downloadFile({
            url: picurl,
            success: function (res) {
              var path = res.tempFilePath
              wx.saveImageToPhotosAlbum({
                filePath: path,
                success(res) {
                  wx.showToast({
                    title: '保存成功',
                    icon: 'success',
                    duration: 2000
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


  //点击爱心
  toChange: function () {
    var that = this;
    if (that.data.likePicture) {
      wx.showModal({
        title: '提示',
        content: '你想收走你的小心心吗?',
        confirmText: '果断收走',
        cancelText: '打扰了',
        success: function (res) {
          if (res.confirm) {
            wx.request({
              url: 'https://www.gzitrans.cn/api_v1/wx/discover/toChangeLike',
              data: {
                openId: app.globalData.openId,
                pictureUploadLogsId: that.data.id
              },
              success: function (res) {
                var nowLikeNumber = res.data;
                that.setData({
                  likePicture: false,
                  ['oneDiscoverInfo.likeNumber']: nowLikeNumber
                })
                wx.switchTab({
                  url: '/pages/my/my',
                })
              }
            })
          }
        }
      })
    }
  },

  //点击发送按钮提交评论
  formSubmit: function (e) {
    var that = this;
    var discoverContent = e.detail.value.textarea;
    if (discoverContent.trim().length <= 0) {
      wx.showToast({
        icon: 'none',
        title: '无评论内容',
      })
    } else {
      wx.showLoading({
        title: '提交中',
      })
      wx.request({
        url: 'https://www.gzitrans.cn/api_v1/wx/discuss/receiveDiscuss',
        data: {
          openId: app.globalData.openId,
          pictureUploadLogsId: that.data.id,
          discussContent: discoverContent
        },
        success: function (res) {
          if (res.data == 'success') {
            wx.hideLoading();
            wx.showToast({
              title: '提交成功',
              duration: 2000
            })

            that.setData({
              content: ''
            })

            wx.request({
              url: 'https://www.gzitrans.cn/api_v1/wx/discover/getDiscoverInfo',
              data: {
                pictureUploadLogsId: that.data.id
              },
              success: function (res) {
                that.setData({
                  oneDiscoverInfo: res.data
                })
              }
            })
          }
        }
      })
    }
  },


  //点击首页按钮返回发现主页
  toDiscover: function () {
    wx.switchTab({
      url: '/pages/discover/discover',
    })
  },


  //点击用户头像跳转
  toPeople: function () {
    var that = this;
    wx.navigateTo({
      url: '/pages/people/people?peopleOpenId=' + that.data.oneDiscoverInfo.openId,
    })
  },

})