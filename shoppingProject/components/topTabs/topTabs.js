// components/topTabs/topTabs.js
Component({
  /**
   * 组件的属性列表
   */
  // 接收父组件传递来的数据
  properties: {
    tabs_data:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTab(e){
      var index=e.currentTarget.dataset.index
      this.triggerEvent('clickTab',{index})
    }
  }
})
