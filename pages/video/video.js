// pages/video/video.js
import request from '../../uitls/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList:[],
    navId:'',
    videoList:[],
    mvList : [],
    mvid:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.getVideoGroupListData()
   this.getRecommendList()
  },
  async  getVideoGroupListData(){
    let videoGroupListData = await request('/video/group/list')
    this.setData({
      videoGroupList:videoGroupListData.data.slice(0,13),
      navId:videoGroupListData.data[0].id
    })
   this.getVideoList(this.data.navId)
  },
  // 获取列表数据
  async  getVideoList(navId){
    let videoListData = await request('/video/group',{id:navId})
    wx.hideLoading();
    console.log(videoListData);
    let index = 0;
    let videoList = videoListData.datas.map(item => {
      item.id = index++
      return item
    })
    this.setData({
      videoList
    })
  },
  // 获取mv数据
  async getRecommendList(){
    let recommendData = await request('/mv/first',{limit:8})
    // console.log(recommendData);
    this.setData({
      mvGroupList:recommendData.data,
      mvid:recommendData.data.id
    })
    this.getMvList(this.data.mvid)

  },
  // mv地址
  async getMvList(mvid){
        let mvData = await request('/mv/url',{id:mvid})
        // console.log(mvData);
        this.setData({
        // mvList:mavData.data
        })
  },
  changeNav(event){
    let navId = event.currentTarget.id;
    // console.log(navId);
    this.setData({
      navId:navId * 1,
      videoList:[]
    })
    wx.showLoading({
      title:"正在加载" ,
      // mask: true, 
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
      
    this.getVideoList(this.data.navId)
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