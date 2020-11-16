// pages/video/video.js
import request from '../../uitls/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList:[],
    navId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.getVideoGroupListData()
   this.getVideoList(this.data.navId)
  },
  async  getVideoGroupListData(){
    let videoGroupListData = await request('/video/group/list')
    this.setData({
      videoGroupList:videoGroupListData.data.slice(0,13),
      navId:videoGroupListData.data[0].id
    })
  },
  async  getVideoList(navId){
    let videoListData = await request('/video/group',{id:navId})
    console.log(videoListData);
  },
  changeNav(event){
    let navId = event.currentTarget.id;
    console.log(navId);
    this.setData({
      navId:navId * 1
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