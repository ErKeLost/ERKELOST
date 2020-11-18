// pages/recommendSong/recommendSong.js
import request from '../../uitls/request'
import PubSub from 'pubsub-js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day: '',
    month: '',
    recommendList: [],
    index: 0 //点击音乐的下标
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 订阅songdetail发布的消息
    PubSub.subscribe('switchType', (msg, type) => {
      let {
        recommendList,
        index
      } = this.data
      if (type === 'next') {
        (index === recommendList.length - 1) && (index = -1)

        index += 1
      } else {
        (index === 0) && (index = recommendList.length)

        index -= 1
      }
      let musicId = recommendList[index].id
      // console.log(musicId);
      // 更新index
      this.setData({
        index
      })
      //id回传给songdetail
      PubSub.publish('musicId', musicId)
    })
    // 判断用户是否登录
    let userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
        success: (result) => {
          // 跳转登录
          wx.reLaunch({
            url: '/pages/login/login'
          })
        },
        fail: () => {},
        complete: () => {}
      });

    }
    this.setData({
      day: new Date().getDate(),
      month: new Date().getMonth() + 1
    })
    // 获取每日推荐数据
    this.getRecommendList();
  },
  //  获取用户每日推荐数据
  async getRecommendList() {
    let recommendListData = await request('/recommend/songs')
    this.setData({
      recommendList: recommendListData.data.dailySongs
    })

    console.log(this.data.recommendList);
  },
  toSongDetail(event) {
    let song = event.currentTarget.dataset.song
    let index = event.currentTarget.dataset.index
    this.setData({
      index
    })
    // 路由跳转传参

    wx.navigateTo({
      //  不能将 song对象作为参数  长度过长会被自动截取
      //  url:'/pages/songDetail/songDetail?song=' + JSON.stringify(song)
      url: '/pages/songDetail/songDetail?musicId=' + song.id
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