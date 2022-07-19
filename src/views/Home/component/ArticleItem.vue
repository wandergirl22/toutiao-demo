<template>
  <div>
    <!-- 渲染无图片 -->
    <van-cell
      v-if="articleInfo.cover.type === 0"
      :title="articleInfo.title"
      :label="articleDesc"
    />
    <!-- 渲染一张图片 -->
    <van-cell
      v-if="articleInfo.cover.type === 1"
      :title="articleInfo.title"
      :label="articleDesc"
    >
      <van-image width="3rem" height="2rem" :src="articleInfo.cover.images[0]">
      </van-image>
    </van-cell>
    <!-- 渲染三张图片 -->
    <van-cell v-if="articleInfo.cover.type === 3" :title="articleInfo.title">
      <template #label>
        <div>
          <van-image
            v-for="(item, index) in articleInfo.cover.images"
            :key="index"
            width="3rem"
            height="2rem"
            :src="item"
          ></van-image>
        </div>
        <span>{{ articleDesc }}</span>
      </template>
    </van-cell>
  </div>
</template>
<script>
import dayjs from '@/utils/day'
export default {
  name: 'ArticleItem',
  props: {
    articleInfo: {
      type: Object,
      default: () => {},
      require: true
    }
  },
  components: {},
  data() {
    return {}
  },
  methods: {},
  mounted() {},
  updated() {},
  beforeDestroy() {},
  filters: {},
  computed: {
    articleDesc() {
      const art = this.articleInfo
      const relativeTime = dayjs(this.articleInfo.pubdate).fromNow()
      return `${art.aut_name} ${art.title} ${relativeTime}`
    }
  },
  watch: {}
}
</script>
<style lang="less" scoped></style>
