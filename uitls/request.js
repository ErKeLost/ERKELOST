import config from "./config";

// 封装功能函数
export default (url,data={},methods='GET') => {
  // wx.request({
  //   url,
  //   data,
  //   methods,
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
  return new Promise((resolve,reject) => {
     wx.request({
    url:config.mobleHost + url,
    data,
    methods,
    header: {cookie:wx.getStorageSync('cookies') ? wx.getStorageSync('cookies').find(item => item.indexOf('MUSIC_U') !== -1) : ''},
    // method: 'GET',
    // dataType: 'json',
    // responseType: 'text',
    success: (result) => {
      if(data.isLogin){
        wx.setStorage({
          key: 'cookies',
          data: result.cookies,
          success: (result) => {
            
          },
          fail: () => {},
          complete: () => {}
        });
          
      }
      console.log(result);
      resolve(result.data)
    },
    fail: (err) => {
      console.log("请求失败" + err);
      reject(err)
    },
    complete: () => {}
  });
  })
}
// 封装功能组件