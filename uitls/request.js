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
    // header: {'content-type':'application/json'},
    // method: 'GET',
    // dataType: 'json',
    // responseType: 'text',
    success: (result) => {
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