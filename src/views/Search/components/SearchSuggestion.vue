<template>
  <div>
    <van-cell
      icon="search"
      v-for="(item, index) in highlightSuggestions"
      :key="index"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api'
export default {
  data() {
    return {
      suggestions: []
    }
  },
  props: {
    keyword: {
      type: String,
      required: true
    }
  },
  computed: {
    highlightSuggestions() {
      const reg = new RegExp(this.keyword, 'ig')
      return this.suggestions.map((str) =>
        str.replace(reg, (match) => `<span style="color: red">${match}</span>`)
      )
    }
  },
  watch: {
    // 如果监视属性绑定的函数，在methods里有声明
    // 支持字符串的写法
    // keywords: 'getSearchSuggestion'
    // keywords(){
    //     this.getSearchSuggestion()
    // }
    // 先渲染结构后监听会导致第一次输入内容不会发送请求
    keyword: {
      immediate: true,
      handler() {
        this.getSearchSuggestion()
      }
    }
  },
  methods: {
    async getSearchSuggestion() {
      try {
        const {
          data: { data }
        } = await getSearchSuggestion(this.keyword)
        if (data.options.length === 0 || data.options == null) {
          this.$toast.fail('没有此项搜索建议')
        }
        this.suggestions = data.options
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style lang="less" scoped></style>
