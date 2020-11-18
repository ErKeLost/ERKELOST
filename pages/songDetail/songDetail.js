// pages/songDetail/songDetail.js
import request from '../../uitls/request'
import PubSub from 'pubsub-js'
import moment from 'moment'
const appInstance = getApp(); //获取全局实例


Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay: false,
    song: {},
    musicId: '',
    musicLink:'',
    currentTime:'00:00',
    durationTime:'00:00'
  },

  // 控制音乐功能播放暂停的回调
  handleMusic() {
    let isPlay = !this.data.isPlay
    // this.setData({
    //   isPlay
    // })
    let {
      musicId,
      musicLink
    } = this.data
    this.musicControl(isPlay, musicId,musicLink)
  },
  // 控制音乐播放暂停的功能函数

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // options用于接收路由传参
    let musicId = options.musicId
    this.getMusicInfo(musicId)
    this.setData({
      musicId
    })
    this.getBackgroundAudio = wx.getBackgroundAudioManager();
    // 系统监听音乐播放与暂停
    this.getBackgroundAudio.onPlay(() => {
      this.changePlayList(true)
      // 修改全局音乐播放状态
      appInstance.globalData.musicId = musicId
    })
    this.getBackgroundAudio.onPause(() => {
      this.changePlayList(false)
    })
    // 监视音乐停止  真机 播放 显示
    this.getBackgroundAudio.onStop(() => {
      this.changePlayList(false)
    })
    // 判断当前页面音乐是否崽播放
    if (appInstance.globalData.isMusicPlay && appInstance.globalData.musicId === musicId) {
      // 修改当前页面音乐播放状态
      this.setData({
        isPlay: true
      })
    }
    // 监听音乐播放实时进度
    this.getBackgroundAudio.onTimeUpdate(() => {
      let currentTime = moment(this.getBackgroundAudio.currentTime * 1000 ).format('mm:ss')
      this.setData({
        currentTime 
      })
    })
  },
  // 修改播放功能的封装函数
  changePlayList(isPlay) {
    this.setData({
      isPlay
    })
    appInstance.globalData.isMusicPlay = isPlay

  },
  // 控制音乐播放暂停的功能函数
  async musicControl(isPlay, musicId,musicLink) {

    if (isPlay) {
      if(!musicLink){
        let musicLinkData = await request('/song/url', {
          id: musicId
        })
         musicLink = musicLinkData.data[0].url
        this.setData({
          musicLink
        })
      }
      console.log(musicLink);
      this.getBackgroundAudio.src = musicLink
      this.getBackgroundAudio.title = this.data.song.name
    } else {
      this.getBackgroundAudio.pause()
    }
  },
  async getMusicInfo(musicId) {
    let songData = await request('/song/detail', {
      ids: musicId
    });
    let durationTime = moment(songData.songs[0].dt).format('mm:ss')
    this.setData({
      song: songData.songs[0],
      durationTime
    })
    wx.setNavigationBarTitle({
      title: this.data.song.name + " ADNY",
      success: (result) => {

      },
      fail: () => {},
      complete: () => {}
    });

  },
  // 点击切歌的回调函数
  handleSwitch(event) {
    let type = event.currentTarget.id
    // 关闭当前播放的音乐
    this.getBackgroundAudio.stop()

    console.log(type);
    //订阅来自commendlistsongf发布的musicid消息
    PubSub.subscribe('musicId', (msg, musicId) => {
      console.log(musicId);
      // 获取音乐详情信息
      this.getMusicInfo(musicId)
      // 切歌自动播放
      this.musicControl(true,musicId)
      // 取消订阅
      PubSub.unsubscribe('musicId')
    })
    //  发布消息数据给recommend song页面
    PubSub.publish('switchType', type)
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