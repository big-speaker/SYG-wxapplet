// index.js
// 获取应用实例
const app = getApp()

import {request} from "../../request/index.js"

Page({
  data: {
    swiperList:[],
    cateList:[],
    floorList:[],
    query:[]
  },

  onLoad() {
    this.getswiperList(),
    this.getcateList(),
    this.getfloorList()
  },

  // 获取轮播图数据
  getswiperList(){
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata"})
    .then(result=>{
      this.setData({
        swiperList:result.data.message
      })
    })
  },

  // 获取分类导航图片数据
  getcateList(){
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/home/catitems"})
    .then(result=>{
      this.setData({
        cateList:result.data.message
      })
    })
  },

  // 获取推荐商品信息数据
  getfloorList(){
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/home/floordata"})
    .then(result=>{
      let newResult=result.data.message
      let index1=0
      newResult.forEach(element=>{
        let index2=0
        element.product_list.forEach(element2=>{
          const query=element2.navigator_url.slice(18)
          newResult[index1].product_list[index2].query=query
          index2+=1
        })
        index1+=1
      })
      this.setData({
        floorList:newResult
      })
    })
  }
})
