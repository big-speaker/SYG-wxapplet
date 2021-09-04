import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 上部导航栏数据
    tabs_data:[
      {
        id:0,
        name:'综合',
        active:true
      },
      {
        id:1,
        name:'销量',
        active:false
      },
      {
        id:2,
        name:'价格',
        active:false
      }
    ],
    // 请求的商品数据
    searchGoods:[],
    // 发生请求参数
    requestParams:{
      query:'',
      cid:'',
      pagenum:1,
      pagesize:10
    },
  },
  totalPages:0,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.requestParams.cid=options.cat_id||''
    this.data.requestParams.query=options.query||''
    console.log(options)
    this.getsearchGoods()
  },

  // 获取商品列表信息，并保存在searchGoods中
  getsearchGoods(){
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/goods/search",data:this.data.requestParams})
    .then(result=>{
      this.totalPages=Math.ceil(result.data.message.total/this.data.requestParams.pagesize)
      this.setData({
        searchGoods:result.data.message.goods
      })
    })
  },

  // 点击切换上部导航栏
  clickTab(e){
    let tabs_data=this.data.tabs_data
    tabs_data.forEach((v,i)=>{i===e.detail.index?v.active=true:v.active=false})
    this.setData({
      tabs_data:tabs_data
    })
  },

// 下拉加载剩余商品数据
  onReachBottom: function () {
    if(this.requestParams.pagenum<this.totalPages){
      this.requestParams.pagenum++,
      request({url:"https://api-hmugo-web.itheima.net/api/public/v1/goods/search",data:this.data.requestParams})
      .then(result=>{
      this.setData({
        searchGoods:[...this.data.searchGoods,...result.data.message.goods]
      })
    })
    }else{
      wx.showToast({
        title: '没有更多商品了',
      })
    }
  },

  // 下拉到底，显示无商品数据提示
  onPullDownRefresh:function(){
    this.requestParams.pagenum=1,
    this.getsearchGoods()
    wx-wx.stopPullDownRefresh({
    })
  }
})