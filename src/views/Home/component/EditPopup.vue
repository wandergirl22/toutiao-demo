<template>
  <div>
    <van-popup
      v-model="isShow"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
    >
      <div class="popupMain">
        <div class="my-channel">
          <van-cell title="我的频道">
            <van-button
              size="small"
              round
              class="edit-btn"
              @click="isEdit = !isEdit"
              >{{ isEdit ? '完成' : '编辑' }}</van-button
            >
          </van-cell>
          <van-grid :border="false" gutter="10px" :column-num="4">
            <van-grid-item
              v-for="(item, index) in myChannels"
              :key="item.id"
              :text="item.name"
              :class="{ 'active-channel': item.name === '推荐' }"
              @click="onClickMyChannel(item, index)"
            >
              <template #icon>
                <van-icon
                  v-show="isEdit && item.name !== '推荐'"
                  name="cross"
                />
              </template>
            </van-grid-item>
            <!-- <van-grid-item text="文字" badge="×" /> -->
          </van-grid>
        </div>
        <div class="recommend-channel">
          <van-cell title="推荐频道"> </van-cell>
          <van-grid :border="false" gutter="10px" :column-num="4">
            <van-grid-item
              v-for="item in recommendChannels"
              :key="item.id"
              :text="item.name"
              icon="plus"
              @click="addMyChannel(item)"
            />
          </van-grid>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { getAllChannels } from '@/api'

export default {
  props: {
    myChannels: {
      type: Array,
      default: () => [],
      required: true
    },
    obj: {
      type: Object,
      default: () => {}
    }
  },
  components: {},
  data() {
    return {
      isShow: false,
      allChannels: [],
      isEdit: false
    }
  },
  created() {
    this.getAllChannels()
  },
  methods: {
    async getAllChannels() {
      const {
        data: { data }
      } = await getAllChannels()
      this.allChannels = data.channels
    },
    onClickMyChannel(channel, index) {
      if (this.isEdit && channel.name !== '推荐') {
        return this.$emit('del-mychannel', channel.id)
      }
      if (!this.isEdit) {
        this.isShow = false
        this.$emit('change-active', index)
      }
    },
    addMyChannel(myChannel) {
      this.$emit('add-mychannel', { ...myChannel })
    }
  },
  mounted() {},
  updated() {},
  beforeDestroy() {},
  filters: {},
  computed: {
    recommendChannels() {
      return this.allChannels.filter((item) => {
        // const result = this.myChannels.find((i) => i.id === item.id)
        // // if (result) {
        // //   return false
        // // } else {
        // //   return true
        // // }
        // return !result
        return !this.myChannels.find((i) => i.id === item.id)
      })
    }
  },
  watch: {}
}
</script>
<style lang="less" scoped>
.active-channel {
  /deep/.van-grid-item__text {
    color: red;
  }
}
.popupMain {
  padding-top: 100px;
  .edit-btn {
    color: red;
    padding: 0 30px;
    height: 48px;
    border: 0.027rem solid red;
  }
  :deep(.van-grid-item__content) {
    width: 175px;
    height: 86px;
    background-color: #f4f5f6;
  }
  .my-channel {
    :deep(.van-grid-item__content) {
      position: relative;
      .van-grid-item__icon-wrapper {
        position: absolute;
        top: 0;
        right: 0;
        .van-icon-cross {
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(20%, -35%);
          border: 0.02667rem solid #000;
          border-radius: 50%;
          text-align: center;
          line-height: 0.32rem;
        }
      }
    }
  }
  // 推荐频道的样式 .recommend-channel { // 推荐频道加号样式
  :deep(.van-grid-item__content) {
    flex-direction: row;
    .van-grid-item__icon {
      font-size: 0.5rem;
    }
    .van-grid-item__text {
      margin-top: 0;
    }
  }
}
</style>
