
const app = getApp()

Page({
  data: {
    userInfo: {},
  },

  onLoad: function() {
    const info = wx.getStorageSync('userinfo')
    if(info){
      this.setData({
        userInfo:  info
      })
    }else{
      this.setData({
        userInfo:  app.globalData.userInfo
      })
    }
   
  }


  
  

})
