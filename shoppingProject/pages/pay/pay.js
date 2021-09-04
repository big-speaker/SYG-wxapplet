// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cart:[],
    address:[],
    paycart:[],
    totalPrice:0,
    totalNum:0
  },

  // 将cart过滤后的数据重新存入内存和data中paycart
  setCart(paycart){
    let totalPrice=0
    let totalNum=0
    paycart.forEach(element => {
      if(element.check){
        totalPrice+=element.goods_price*element.num
        totalNum+=element.num
      }
      this.setData({
        totalPrice:totalPrice,
        totalNum:totalNum,
        paycart:paycart
      })
      wx.setStorageSync('paycart', paycart)
    })
  },

  // 设置结算按钮功能
  payWay(){
    let token=wx.getStorageSync('token')
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/auth',
      })
    }else{
      console.log('存在token')
    }
  },
  // 页面加载时将cart数据写入data中并将cart中选中的商品数据过滤后，写入data中的paycart
  onShow: function () {
    let address=wx.getStorageSync('address')
    let cart=wx.getStorageSync('cart')
    let paycart=cart.filter(v=>v.check)
    this.setData({
      address:address,
      cart:cart
    })
    this.setCart(paycart)
  }
})