// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:[],
    cart:[],
    totalPrice:0,
    totalNum:0,
    allcheck:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 获取用户地址
  getAddress(){
    wx.chooseAddress({
      success: (result) => {
        wx.setStorageSync('address', result)
      },
    })
  },

  // 将cart数据重新存入内存和data中
  setCart(cart){
    let totalPrice=0
    let totalNum=0
    cart.forEach(element => {
      if(element.check){
        totalPrice+=element.goods_price*element.num
        totalNum+=element.num
      }
      this.setData({
        totalPrice:totalPrice,
        totalNum:totalNum,
        cart:cart
      })
      wx.setStorageSync('cart', cart)
    })
  },

  // 设置商品单选框被勾选后，将cart重新保存进缓存和data中
  changeCheck(e){
    let cart=this.data.cart
    let index=cart.findIndex(element=>element.goods_id===e.currentTarget.dataset.id)
    cart[index].check=!cart[index].check
    this.setData({
      cart:cart
    })
    this.setCart(cart)
  },

  // 设置全选框被勾选后，cart数据重新保存进缓存和data中
  changeallCheck(){
    let cart=this.data.cart
    let allcheck=this.data.allcheck
    this.data.allcheck=!allcheck
    cart.forEach(element=>element.check=allcheck)
    this.setCart(cart)
  },

  // 设置商品数量编辑按钮
  editNum(e){
    let id=e.currentTarget.dataset.id
    let operation=e.currentTarget.dataset.operation
    let cart=this.data.cart
    let index=cart.findIndex(v=>v.goods_id===id)
    if(cart[index].num===1&&operation===-1){
      wx.showModal({
        title: '提示',
        content: '是否删除该商品',
        success:(res)=>{
          if (res.confirm) {
            cart.splice(index,1)
            this.setCart(cart)
          }
        }
      })
    }else{
      cart[index].num+=operation
      this.setCart(cart)
    }
  },

  // 设置结算按钮功能
  settleWay(){
    let address=this.data.address
    let totalNum=this.data.totalNum
    if(!address.userName){
      wx.showToast({
        title: '请先选择收货地址~',
      })
    }else if(totalNum===0){
      wx.showToast({
        title: '请先选择需要结算的商品~',
      })
    }else{
      wx.navigateTo({
        url: '/pages/pay/pay',
      })
    }
  },
  onShow: function () {
    let address=wx.getStorageSync('address')
    let cart=wx.getStorageSync('cart')
    this.setData({
      address:address,
      cart:cart
    })
    this.setCart(cart)
  }
})