import {request} from "../../request/index.js"
// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchData:[]
  },

  // 搜索商品并将搜索结果缓存
  searchGoods(e){
    const value=e.detail.value
    if(!value.trim()){
      return
    }
    // 搜索代码，由于接口无法使用，故将该代码注释
    // request({url:"https://api.zbztb.cn/api/public/v1/goods/qsearch",data:value})
    // .then(result=>{
    //   console.log(result)
    //   this.setData({
    //     searchData:result
    //   })
    // })
  }
})