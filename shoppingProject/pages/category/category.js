import {request} from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodList:[],
    leftgoodList:[],
    rightgoodList:[],
    menusIndex:0,
    scrollTop:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 将分类数据从缓存中保存进本页面，通过这些数据进行渲染
  onLoad: function (options) {
    const goodsData=wx.getStorageSync('goodsData')
    if(!goodsData){
      this.getgoodList()
    }else{
      if(goodsData.time-Date.now()>(1000*100)){
        this.getgoodList()
      }else{
        this.setData({
          goodList:goodsData.data,
          leftgoodList:goodsData.data.map(v=>v.cat_name),
          rightgoodList:goodsData.data[0].children
        })
      }
    }
  },

  // 点击商品。转跳到该商品的详细数据页面，并传递该商品的cid值
  getgoodList(){
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/categories"})
    .then(result=>{
      wx.setStorageSync('goodsData',{time:Date.now(),data:result.data.message})
      this.setData({
        goodList:result.data.message,
        leftgoodList:result.data.message.map(v=>v.cat_name),
        rightgoodList:result.data.message[0].children
      })
    })
  },

  // 点击左侧列表上的品牌，在右侧列表中渲染该品牌对应的商品
  onChange(e){
    const index=e.currentTarget.dataset.index
    this.setData({
      menusIndex:index,
      rightgoodList:this.data.goodList[index].children,
      scrollTop:0
    })
  }
})