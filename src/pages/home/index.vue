<!--
 * @author: wangshuaixue
 * @Date: 2023-07-04 14:37:53
 * @description: 
 * @LastEditTime: 2023-08-14 14:55:52
 * @LastEditors: wangshuaixue
 * @FilePath: /draw/src/pages/home/index.vue
-->
<template>
  <view class="content">
    <view class="text-area">
      <text class="title">首页</text>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: 'Hello',
      };
    },
    onLoad() {},
    methods: {},
  };
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
