const app = getApp();
Page({
  data:{
    userinfo:{},
    openid:""
  },
  onGotUserInfo:function(e){
    const that = this
    wx.cloud.callFunction({
      name:"login",
      success:res=>{
        console.log("云函数调用成功")
        that.setData({
          openid:res.result.openid,
          userinfo: e.detail.userInfo
        })

        that.data.userinfo.openid = that.data.openid
      
        app.globalData.userInfo=that.data.userinfo
        app.globalData.openid=that.data.openid
        wx.setStorageSync("userinfo", that.data.userinfo)
        wx.setStorageSync("openid", that.data.openid)
       if(!app.groomInfo)
        wx.redirectTo({  
          url:'../createRoom/createPage'  
             });  
      },
      fail:res=>{
        console.log("云函数调用失败")
      }
    })
  },
  onLoad:function(options){
    const info = wx.getStorageSync('roomInfo')

  
    if(info){
    
      wx.switchTab({  
        url:'../index/index'  
           });  
    }
  }
})