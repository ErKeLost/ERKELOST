import request from '../../uitls/request'
import config from '../../uitls/config'
// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList:[],//轮播图数据
    recommendList:[],//推荐歌单数据
    topList:[],//排行榜数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    // wx.request({
    //   url: 'http://localhost:3000/banner',
    //   data: {type:2},
    //   // header: {'content-type':'application/json'},
    //   // method: 'GET',
    //   // dataType: 'json',
    //   // responseType: 'text',
    //   success: (result) => {
    //     console.log(result);
    //   },
    //   fail: (err) => {
    //     console.log("请求失败" + err);
    //   },
    //   complete: () => {}
    // });

   let bannerListData = await request('/banner',{type:2})
      this.setData({
        bannerList:bannerListData.banners
      })
   let recommendListData = await request('/personalized',{limit:10})
      this.setData({
        recommendList:recommendListData.result
      })
  //  let index = 0;
  //  let resultArr  = []
  //  while(index < 5 ){
  // //  let topListItem = {name:topListData.playlist.name,tracks:topListData.playlist.tracks.slice(0,3)}
  // //  resultArr.push(topListItem)
  //  }
   let topListData = await request('/album/newest')

   this.setData({
     topList:topListData.albums
   })
  },
  recommendList(){
    wx.navigateTo({
      url: '/pages/recommendSong/recommendSong',
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
      
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