/*
 * @author: wangshuaixue
 * @Date: 2023-08-18 14:52:43
 * @description: 
 * @LastEditTime: 2023-08-18 14:53:03
 * @LastEditors: wangshuaixue
 * @FilePath: /draw/src/api/home.js
 */

import {
  request
} from '@/utils/request';

// 首页列表
async function getHomeList(data = {}) {
  return await request('/drawing.pageArtwork', data)
}


export {
  getHomeList
}