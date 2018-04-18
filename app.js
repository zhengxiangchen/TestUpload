App({
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    //this.login();
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    this.login();
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    console.log("小程序从前台进入后台");
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    wx.showToast({
      title: msg,
    })
  },
  globalData: {
    toLogin:true,
    userInfo: null,
    openId: null,
    user:{
      openId:null,
      nickName:null,
      avatarUrl:null,
      gender:null,
      city:null,
      province:null,
      country:null,
      language:null
    }
  },
  //登录
  login: function () {
    var that = this;
    wx.checkSession({
      success: function () {
        console.log("登录态未过期");
        wx.getUserInfo({
          success: function (res) {
            // 可以将 res 发送给后台解码出 unionId
            var openid = wx.getStorageSync(res.userInfo.nickName);
            that.globalData.openId = openid;
            that.globalData.userInfo = res.userInfo;
            if (that.globalData.toLogin){
              wx.switchTab({
                url: '/pages/discover/discover'
              })
            }
            
            if (that.userInfoReadyCallback) {
              that.userInfoReadyCallback(res)
            }
          },
        })
      },
      fail: function () {
        console.log("登录态过期了");
        wx.login({
          success: function (res) {
            var loginCode = res.code;
            if (loginCode) {
              //发起网络请求
              wx.request({
                url: 'https://www.gzitrans.cn/api_v1/wx/user/receiveCode',
                data: {
                  loginCode: loginCode
                },
                success: function (res) {
                  //返回的openid为全局变量赋值
                  var openid = res.data;
                  wx.getUserInfo({
                    success: function (res) {
                      // 可以将 res 发送给后台解码出 unionId
                      console.log("用户重新登录");
                      wx.setStorage({
                        key: res.userInfo.nickName,
                        data: openid,
                      })
                      that.globalData.userInfo = res.userInfo;
                      that.globalData.user.openId = openid;
                      that.globalData.user.nickName = res.userInfo.nickName;
                      that.globalData.user.avatarUrl = res.userInfo.avatarUrl;
                      that.globalData.user.gender = res.userInfo.gender;
                      that.globalData.user.city = res.userInfo.city;
                      that.globalData.user.province = res.userInfo.province;
                      that.globalData.user.country = res.userInfo.country;
                      that.globalData.user.language = res.userInfo.language;

                      wx.request({
                        url: "https://www.gzitrans.cn/api_v1/wx/user/login",
                        data: {
                          userString: that.globalData.user,
                        }
                      })
                      wx.switchTab({
                        url: '/pages/discover/discover'
                      })
                      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                      // 所以此处加入 callback 以防止这种情况
                      if (that.userInfoReadyCallback) {
                        that.userInfoReadyCallback(res)
                      }
                    },
                    fail: function (res) {
                      wx.redirectTo({
                        url: '/pages/scope/scope',
                      })
                    }
                  })
                },
                fail: function (res) {
                  that.setData({
                    isHideLoadMore: true
                  })
                  wx.showToast({
                    title: '服务器维护中',
                    image: '/images/tip.png',
                    duration: 3500
                  })
                }
              })
            } else {
              console.log('获取用户登录态失败！' + res.errMsg)
            }
          }
        })
      }
    })
  }
})