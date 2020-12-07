const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc:null,
    roomInfo:null,
    avatarUrl:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    var fileid = app.globalData.roomInfo.avatar;
    var that = this;
    wx.cloud.getTempFileURL({
      fileList: [fileid],
      success: res => {
        that.setData({

          imgSrc: res.fileList[0].tempFileURL
        });
      
        wx.downloadFile({
          url: that.data.imgSrc,
          success: (res) => {
            that.setData({
              avatarUrl: res.tempFilePath
            })

            
          },
          fail: (err) => {
            console.log('读取失败', err)
          }
        })
      },
      fail: err => {
		console.log(err);
      }
    })

    this.setData({
    roomInfo:app.globalData.roomInfo
    })
    console.log(this.data.roomInfo)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})