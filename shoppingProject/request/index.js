let ajaxTime=0;
export const request=(params)=>{
    return new Promise((resolve,reject)=>{
        ajaxTime++;
        wx.showLoading({
            title: '加载中',
          })
        wx.request({
            ...params,
            success:(result)=>{
                ajaxTime--;
                resolve(result);
                if(ajaxTime===0){
                    wx.hideLoading()
                }
            },
            fail:(err)=>{
                ajaxTime--;
                reject(err);
                if(ajaxTime===0){
                    wx.hideLoading()
                }
            }
          });
        })
}