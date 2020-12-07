const db = wx.cloud.database();
const room = db.collection('room');
const app = getApp();
Page({

  data: {
    avatar:null,
    index:-1,
    picker: ['2人寝', '4人寝', '6人寝','8人寝','其他'],
  },
  selectImage:function(e){
    wx.chooseImage({
      complete: (res) => {
        this.setData({
          avatarUrl:res.tempFilePaths[0]
        })
      //  console.log(res.tempFilePaths[0])
       wx.cloud.uploadFile({
         cloudPath:`${Math.floor(Math.random()*1000000)}.png`,
         filePath:res.tempFilePaths[0]
       }).then(res=>{
         console.log("filrid----",res.fileID)
         app.globalData.roomInfo.avatar=res.fileID
         this.setData({
          avatar:res.fileID
         })
         console.log("页面的头像数据。。。",this.data.avatar)
         console.log("全局的头像数据。。。",app.globalData.roomInfo.avatar)
         
       }).catch(err=>{ 
         console.error(err)
       })
      },
    })
 },
  pickerSelect:function(e){
     this.setData({
      index:e.detail.value
     })
  },
  onLoad: function (options) {
    
  },

  onReady: function () {
    
  },

  onShow: function () {

  },
 formSubmit:function(event){
   console.log("表单提交的数据",event)
   app.globalData.roomInfo={
    roomName: event.detail.value.roomName,
    roomDesc:event.detail.value.roomDesc,
    avatar:app.globalData.roomInfo.avatar,
    members:[app.globalData.openid]
   },
   wx.setStorageSync("roomInfo", app.globalData.roomInfo)

  room.add({
    data:{
      roomName:event.detail.value.roomName,
      roomDesc:event.detail.value.roomDesc,
      avatar:app.globalData.roomInfo.avatar,
      members:[app.globalData.openid]
    }
   }).then(res=>{
      // console.log(res)
      //显示提交成功
      wx.showToast({
        title:'创建成功',
        icon:'success'
      })
   })
   console.log("roominfo----",app.globalData.roomInfo)
   wx.switchTab({  
    url:'../index/index'  
       }); 
     
   
  }


})