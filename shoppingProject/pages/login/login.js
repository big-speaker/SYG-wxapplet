// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:[],
  },

  // 获取登录用户信息
  clickBu(){
    wx.getUserProfile({
      desc: 'desc',
      success:(res)=>{
        wx.setStorageSync('userInfo', res.userInfo)
        this.setData({
          userInfo:res.userInfo
        })
      }
    })
    wx.navigateTo({
      url: '/pages/user/user',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  }
})