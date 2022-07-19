<template>
  <div>
    <van-pull-refresh
      v-model="isLoading"
      @refresh="loadNextPage"
      success-text="刷新成功"
    >
      <!-- 列表最后加载 -->
      <!-- offset 滚动条距离底部位置 -->
      <!-- offset="0" -->
      <van-list
        @load="loadNextPage"
        v-model="loading"
        :finished="isFinished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <ArticleItem
          v-for="item in articles"
          :key="item.art_id"
          :articleInfo="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/api'
import ArticleItem from './ArticleItem'
export default {
  components: {
    ArticleItem
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      articles: [],
      pre_timestamp: '',
      loading: false,
      isFinished: false,
      error: false,
      isLoading: false
    }
  },
  created() {
    this.getArticleList()
  },
  methods: {
    async getArticleList() {
      // date.now()
      // +new Date()
      try {
        const {
          data: { data }
        } = await getArticleList(this.id, +new Date())
        console.log(data)
        // 保存第一次页码
        this.pre_timestamp = data.pre_timestamp
        this.articles = data.results
      } catch (error) {
        const status = error.response.status
        if (status === 400) {
          throw new Error(error.response.data.message)
        } else {
          this.$toast.fail('获取列表失败，请重新刷新')
        }
      }
    },
    // 加载下一页数据
    async loadNextPage() {
      try {
        const {
          data: { data }
        } = await getArticleList(this.id, this.pre_timestamp)
        // 如果前一页时间戳不存在
        if (!data.pre_timestamp) {
          this.isFinished = true
        }
        if (this.isLoading) {
          // 如果是下拉刷新，把数据放在头部
          this.articles.unshift(...data.results)
        } else {
          // 下拉加载，数据放在尾部
          // 将第n页的数据，放进列表
          this.articles.push(...data.results)
        }

        // 更新页数
        this.pre_timestamp = data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        // 不管前面发生什么，finally 里的代码一定会执行
        // 第一次加载后内部自动设置成true
        // 需要手动设置成false
        // 下拉加载
        this.loading = false
        // 下拉刷新
        this.isLoading = false
      }
    }
  }
}
</script>

<style></style>
