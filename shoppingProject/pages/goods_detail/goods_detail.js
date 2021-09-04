import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_detailList:{},
    starnumber:1,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // 加载商品详情数据
  onLoad: function (options) {
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/goods/detail",data:options})
    .then(res=>{
      this.setData({
        goods_detailList:{
          goods_id:res.data.message.goods_id,
          goods_price:res.data.message.goods_price,
          goods_name:res.data.message.goods_name,
          pics:res.data.message.pics,
          goods_introduce:res.data.message.goods_introduce,
          pics_id:res.data.message.pics_id
        }
      })
    })
  },

  // 点击商品收藏按钮
  onStar(e){
    if(this.data.starnumber===1){
      this.setData({
        starnumber:2,
      })
    }else{
      if(this.data.starnumber===2){
      this.setData({
        starnumber:1
      })
    }}
  },

  // 点击轮播图查看图片
  onclickImage(e){
    wx.previewImage({
      current:e.currentTarget.dataset.firsturl,
      urls:this.data.goods_detailList.pics.map(v=>v.pics_mid),
    })
  },

  // 添加商品进入购物车和缓存中
  addGoods(){
    let cart=wx.getStorageSync('cart')||[]
    let index=cart.findIndex(v=>v.goods_id===this.data.goods_detailList.goods_id)
    if(index===-1){
      this.data.goods_detailList.num=1
      this.data.goods_detailList.check=true
      cart.push(this.data.goods_detailList)
    }else{
      cart[index].num++
    }
    wx.setStorageSync('cart', cart)
    wx.showToast({
      title: '加入购物车成功',
      mask:true
    })
  }
})