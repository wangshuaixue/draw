<!--
 * @author: wangshuaixue
 * @Date: 2023-07-04 14:37:53
 * @description: 
 * @LastEditTime: 2023-08-18 17:48:21
 * @LastEditors: wangshuaixue
 * @FilePath: /draw/src/pages/home/index.vue
-->
<template>
  <view class="content">
    <view
      class="box"
      @click="toDetail(item)"
      v-for="(item,index) in list"
      :key="index"
    >
      <image
        class="img"
        :src="`https://image.chatai-gpt4.com/${item.artworkItemVo.pictures[0].imageUrl}?imageMogr2/format/webp`"
      ></image>
      <view
        class="desc"
        v-if="item.artworkItemVo.title"
      >{{item.artworkItemVo.title}}</view>
      <view class="line-wrap">
        <view class="user-wrap">
          <image
            class="avat"
            :src="item.userInfoVo.avatarUrl"
          ></image>
          <text>{{item.userInfoVo.userName}}</text>
        </view>
        <view class="flex">
          <uni-icons
            type="heart-filled"
            size="20"
            color="#FF7C33"
            v-if="item.userInfoVo.likedStatus"
          ></uni-icons>
          <uni-icons
            v-else
            type="heart"
            size="20"
            color="#FF7C33"
          ></uni-icons>
          <text
            class="number"
            v-if="item.artworkItemVo.likeCount > 0"
          >{{item.artworkItemVo.likeCount}}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import { getHomeList } from '@/api/home';
  export default {
    data() {
      return {
        list: [],
      };
    },
    async onLoad() {
      let { code, data } = await getHomeList({
        page: 1,
        pageSize: 20,
      });
      if (code == 200) {
        this.list = data.items;
      }
    },
    methods: {
      toDetail(para) {
        uni.setStorageSync('detail', para);
        uni.navigateTo({
          url: '/otherPkg/pages/detail',
        });
      },
    },
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
  margin-bottom: 20rpx;
  .desc {
    padding: 0 10rpx;
    margin-top: 10rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .flex {
    display: flex;
    align-items: center;
  }
  .number {
    color: #ff7c33;
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
