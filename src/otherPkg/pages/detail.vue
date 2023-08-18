<!--
 * @author: wangshuaixue
 * @Date: 2023-08-18 16:12:35
 * @description: 
 * @LastEditTime: 2023-08-18 17:47:19
 * @LastEditors: wangshuaixue
 * @FilePath: /draw/src/otherPkg/pages/detail.vue
-->
<template>
  <view class="content">
    <view class="line-wrap">
      <view class="user-wrap">
        <image
          class="avat"
          :src="user.avatarUrl"
        ></image>
        <text>{{user.userName}}</text>
      </view>
    </view>
    <image
      class="img"
      :src="`https://image.chatai-gpt4.com/${picture}?imageMogr2/format/webp`"
    ></image>
    <view class="title">{{title}}</view>
    <view class="desc">{{desc}}</view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: '',
        picture: '',
        user: {},
        desc: '',
      };
    },
    onLoad() {
      this.user = uni.getStorageSync('detail').userInfoVo || {};

      this.picture = uni.getStorageSync('detail').artworkItemVo.pictures[0].imageUrl;
      this.desc = uni.getStorageSync('detail').artworkItemVo.content;
      console.log(uni.getStorageSync('detail'));
    },
    methods: {},
  };
</script>

<style lang="scss" scoped>
.content {
  padding: 0 20rpx;
  .line-wrap {
    padding: 0 10rpx 14rpx;
    margin-top: 10rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .user-wrap {
    display: flex;
    align-items: center;
    font-size: 26rpx;
    .avat {
      width: 60rpx;
      height: 60rpx;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 10rpx;
    }
  }
  .img {
    width: 100%;
  }
  .title {
    margin-top: 16rpx;
    font-size: 32rpx;
  }
  .desc {
    margin-top: 16rpx;
    font-size: 28rpx;
  }
}
</style>