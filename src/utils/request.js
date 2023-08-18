/*
 * @author: wangshuaixue
 * @Date: 2023-08-18 14:53:39
 * @description: 
 * @LastEditTime: 2023-08-18 15:43:19
 * @LastEditors: wangshuaixue
 * @FilePath: /draw/src/utils/request.js
 */
/**
 * @description: 对外暴露请求方法
 * @param {string} path 请求地址
 * @param {object} params 携带参数
 * @param {string} method POST GET  PUT  
 */

const request = async function(path, params, method = 'POST'){
  return await ajax(path, params, method);
};

// 获取授权code
function getWxLogin() {
  return new Promise((resolve, reject) => {
    uni.login({
      provider: 'weixin',
      onlyAuthorize: true,
      success: function (res) {
        resolve(res.code);
      },
      fail: function (res) {
        reject(res.errMsg);
      }
    });
  })
}

/**
* @description: install 接口
*/
async function install() {
  try {
    return new Promise(async (resolve) => {
      // 拉取微信用户code
      const wxLoginCode = await getWxLogin();
      if (wxLoginCode) {
        let res = await ajax('/api/wechat/get_session_key', {
          js_code: wxLoginCode,
        }, 'GET');
        if (res.code === 200) {
          uni.setStorageSync('openId',res.data.openid);
          // refreshRequestList();
          resolve();
        } else {
          resolve();
        }
      }
    });
  } catch (e) {}
}

/**
* @description: uni.request封装
* @param {string} path 请求地址
* @param {object} params 携带参数
* @param {string} method POST GET
*/

async function ajax(path, params, method= 'POST') {
  try {
    return new Promise((resolve, reject) => {
      let baseUrl = import.meta.env.VITE_BASE_URL;
      console.log(baseUrl + path, 'baseUrl + path', method)
      uni.request({
        url: baseUrl + path,
        timeout: 8000,
        data: method == 'GET' ? params :  {params},
        header: {
          'Authorization': `${uni.getStorageSync('loginStatus') ? `Bearer ${uni.getStorageSync('token')}` : '' }`,
          'Content-Type': 'application/json'
        },
        method,
        success: async (res) => {
          if(res.data.code !== 200) {
            uni.showToast({
              title: `${res.data.msg}`,
              icon: 'none',
              duration: 2000
            });
          }
          resolve(res.data);
        },
        fail: (err) => {
          uni.showToast({
            title: '网络异常，请稍后再试',
            icon: 'none',
            duration: 2000
          });
          console.log(err, 'request-error')
          reject(err);
        }
      });
    });
  } catch (e) {}
}

export { request, install};
