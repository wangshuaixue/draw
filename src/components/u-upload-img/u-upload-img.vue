<template>
  <view class="list-wrap">
    <!-- 图片 -->
    <view class="img-warp">
      <view
        class="camera-wrap"
        v-for="(src, index) in imgList"
        :key="index"
      >
        <image
          :src="src"
          style="width: 100%; height: 100%;"
          @click="previewImg(src)"
          mode="aspectFit"
        />
        <image
          class="delete"
          @click="deleteImg(index)"
          v-if="!isHide"
          src="/static/images/icon-img-del.png"
        >
          <!-- <uni-icons
            class="dele-icon"
            type="clear"
            size="20"
            color="#6DA6FF"
          ></uni-icons> -->
        </image>
      </view>
      <!-- 上传按钮 -->
      <view
        @click="chooseFile"
        class="camera-wrap"
        v-if="imgList.length < maxNum && !isHide"
      >
        <uni-icons
          type="plusempty"
          size="30"
          color="#333"
        ></uni-icons>
        <text class="text-up">上传照片</text>
      </view>
    </view>
    <!-- 上传按钮 -->
    <view
      @click="chooseFile"
      class="camera-wrap"
      v-if="imgList.length < maxNum && !isHide && isVideo"
    >
      <uni-icons
        type="plusempty"
        size="30"
        color="#D8D8D8"
      ></uni-icons>
      <text class="text-up">上传{{isVideo ? '视频' : '照片'}}</text>
    </view>
  </view>
</template>

<script>
  import { getOss } from '@/api/common';
  import { uploadFile } from '@/utils/uploadFile';

  export default {
    props: {
      //拍摄视频最长拍摄时间，单位秒。最长支持 60 秒。 (只针对拍摄视频有用)
      maxDuration: {
        type: Number,
        default: 60,
      },
      //是否需要压缩
      compress: {
        type: Boolean,
        default: true,
      },
      // 是否上传的是视频
      isVideo: {
        type: Boolean,
        default: false,
      },
      fileName: {
        type: String,
        default: 'avatar',
      },
      // 图片 多个的话就是数组 单个的话就是字符串
      list: {
        type: Array || String,
        default: null,
      },
      maxNum: {
        type: Number,
        default: 1,
      },
      // 隐藏 删除操作按钮 仅展示 true 可操作 false
      isHide: {
        type: Boolean,
        default: false,
      },
      // 单个图片地址
      img: {
        type: String,
        default: null,
      },
    },
    data() {
      return {
        // 列表
        // 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-fbd63a76-dc76-485c-b711-f79f2986daeb/ba804d82-860b-4d1a-a706-5a4c8ce137c3.mp4'
        imgList: [],
        // 预览视频地址
        previewVideoSrc: '',
      };
    },
    mounted() {
      this.imgList = this.list || [];
      // console.log(this.list, '图片')
      if (this.maxNum == 1 && this.img != '' && this.img != null) {
        this.imgList = [this.img];
      } else {
        this.imgList = this.list || [];
      }
      console.log(this.imgList, 'this.imgList');
    },
    methods: {
      radioChange(e) {
        console.log(e, 'e');
      },
      previewImg(src) {
        uni.previewImage({
          current: src,
          urls: this.imgList,
        });
      },
      previewVideo(src) {
        this.previewVideoSrc = src;
        // this.previewVideoSrc =
        // 	'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-fbd63a76-dc76-485c-b711-f79f2986daeb/ba804d82-860b-4d1a-a706-5a4c8ce137c3.mp4'
      },
      previewVideoClose() {
        this.previewVideoSrc = '';
        //console.log('previewVideoClose', this.previewVideoSrc)
      },

      deleteImg(index) {
        this.imgList.splice(index, 1);
        this.$emit('uploadSuccess', this.imgList);
      },

      chooseFile() {
        if (this.isVideo) {
          uni.chooseVideo({
            compressed: this.compress,
            maxDuration: this.maxDuration,
            success: (res) => {
              // 判断超过100m 不上传

              this.imgList.push(res.tempFilePath);
              console.log(res, '选择视频');
            },
          });
        } else {
          console.log('chooseImg');
          this.chooseImg();
        }
      },
      submitFile(path) {
        return new Promise((resolve, reject) => {
          uploadFile(
            path,
            this.fileName,
            this.ossRes,
            (uploadRes) => {
              resolve(uploadRes.url);
            },
            (err) => {
              reject(err);
            }
          );
        });
      },
      async chooseImg() {
        try {
          console.log('ossRes');
          let ossRes = await getOss();
          this.ossRes = ossRes.data;
          let that = this;
          uni.chooseImage({
            count: that.maxNum - that.imgList.length, //默认9
            sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
            success: function (res) {
              let paths = res.tempFilePaths;
              let promises = [];
              paths.forEach((path, index) => {
                promises.push(that.submitFile(path));
              });
              Promise.all([...promises]).then((allRes) => {
                console.log(allRes, 'promiseall');
                that.imgList = that.imgList.concat(allRes);

                if (that.maxNum == 1) {
                  that.$emit('uploadSuccess', that.imgList[0]);
                } else {
                  that.$emit('uploadSuccess', that.imgList);
                }
              });

              // let avatar = res.tempFilePaths[0];
              //   uploadFile(avatar, this.fileName, ossRes.data, (uploadRes)=>{
              //     that.imgList.push(uploadRes.url);
              //     if(that.maxNum == 1) {
              //       that.$emit('uploadSuccess', that.imgList[0]);
              //     }else {
              //       that.$emit('uploadSuccess', that.imgList);
              //     }
              //   },(err)=>{
              //     console.log(err)
              //   })
            },
          });
        } catch (catchErr) {
          console.log(catchErr);
        }
      },
    },
  };
</script>

<style scoped lang="scss">
::v-deep .dele-icon,
::v-deep .radio-icon {
  display: flex;
  z-index: 1;
}
.list-wrap {
  display: flex;
  align-items: center;
  .hint {
    color: #ccc;
    font-size: 28rpx;
  }
}
.label-inner {
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22rpx;
  background-color: rgba(0, 0, 0, 0.3);
  .text {
    color: #fff;
    margin-left: 10rpx;
  }
  .check-text {
    position: relative;
    &::before {
      position: absolute;
      top: 10rpx;
      left: -34rpx;
      content: '';
      height: 10rpx;
      width: 16rpx;
      background-color: #fff;
    }
  }
}

.img-warp {
  display: flex;
  flex-wrap: wrap;
}
.delete {
  position: absolute;
  right: -16rpx;
  top: -16rpx;
  width: 36rpx;
  height: 36rpx;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  // width: 32rpx;
  // height: 32rpx;
  // background-color: #7e7e7e;
  // border-radius: 0 0 0 16rpx;
}
.camera-wrap {
  width: 172rpx;
  height: 172rpx;
  font-size: 26rpx;
  margin-right: 28rpx;
  margin-top: 28rpx;
  color: #999;
  background-color: #f6f6f6;
  border-radius: 10rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  &:nth-child(3n) {
    margin-right: 0;
  }
  .text-up {
    margin-top: 14rpx;
  }
}
.icon {
  width: 77rpx;
  height: 66rpx;
}
</style>