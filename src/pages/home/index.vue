<!--
 * @author: wangshuaixue
 * @Date: 2023-07-04 14:37:53
 * @description: 
 * @LastEditTime: 2023-08-16 15:29:20
 * @LastEditors: wangshuaixue
 * @FilePath: /draw/src/pages/home/index.vue
-->
<template>
  <view class="content">
    <view class="box">
      <image
        class="img"
        src="https://file.tangchenglive.com/uploadfile/20230707/535841053627027457.png"
      ></image>
      <view class="desc">标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</view>
      <view class="line-wrap">
        <view class="user-wrap">
          <image
            class="avat"
            src="https://file.tangchenglive.com/uploadfile/20230707/535841053627027457.png"
          ></image>
          <text>昵称 名称1111</text>
        </view>
        <uni-icons
          type="heart"
          size="20"
          color="#FF7C33"
        ></uni-icons>
        <!-- <uni-icons type="heart-filled" size="20" color="#FF7C33"></uni-icons> -->
      </view>
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

<style lang="scss" scoped>
.content {
  padding: 0 20rpx;
}
.box {
  background: #fff;
  border-radius: 10rpx;
  overflow: hidden;
  box-shadow: 0rpx 10rpx 24rpx 0rpx rgba(225, 225, 225, 0.5);
  .desc {
    padding: 0 10rpx;
    margin-top: 10rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
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
}
.img {
  width: 100%;
  height: 400rpx;
  object-fit: cover;
  border-radius: 14rpx;
}
</style>
