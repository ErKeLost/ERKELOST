import request from '../../uitls/request'

// pages/profile/personal.js
let startY = 0 //手指起始的坐标
let moveY = 0 //手指移动的坐标
let moveDistance = 0 //手指移动的距离
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverTransform : 'translateY(0)',
    coverTransition : "",
    userInfo:{},
    recentPlayList : []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo');
      if(userInfo){
        this.setData({
          userInfo : JSON.parse(userInfo)
        })
      this.getUserRecentPlayList(this.data.userInfo.userId)
      // console.log(this.data.userInfo.userId);
      // console.log(this.data.recentPlayList.song.name);
      }
  },
  async getUserRecentPlayList(userId){
    let recentPlayListData = await request('/user/record',{uid : userId , type : 0})
    let index = 0;
    let recentPlayList = recentPlayListData.allData.splice(0,50).map(item => {
      item.id = index++;
      return item
    })
    this.setData({
      recentPlayList 
    })
  },
  toLogin(){
    wx.navigateTo({
      url: '/pages/login/login',
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
      
  },
  handleTouchStart(event) {
    this.setData({
      coverTransition:''
    })
    startY = event.touches[0].clientY
  },
  handleTouchMove(event) {
    moveY = event.touches[0].clientY;
    moveDistance = moveY - startY;
    if(moveDistance <= 0 ){
      return
    }
    if(moveDistance >= 80){
      moveDistance = 80
    }
    this.setData({
      coverTransform: `translateY(${moveDistance}rpx)`
    })
  },
  handleTouchEnd() {
    this.setData({
      coverTransform: `translateY(0rpx)`,
      coverTransition:'transform .5s linear'
    })
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