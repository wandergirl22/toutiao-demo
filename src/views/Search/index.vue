<template>
  <div>
    <!-- ios系统的移动端上也会有搜索框 -->
    <form action="/">
      <van-search
        v-model="keywords"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="onFocus"
        background="#3296fa"
        class="search"
      />
    </form>
    <!-- <SearchResult></SearchResult>
    <SearchHistory></SearchHistory>
    <SearchSuggestion></SearchSuggestion> -->
    <template>
      <component :is="componentName" :keyword="keywords"></component>
    </template>
  </div>
</template>

<script>
import SearchResult from './components/SearchResult.vue'
import SearchHistory from './components/SearchHistory.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'

export default {
  data() {
    return {
      keywords: '',
      isShowSearchResult: false
    }
  },
  components: {
    SearchResult,
    SearchHistory,
    SearchSuggestion
  },
  computed: {
    componentName() {
      // 如果不输入或者输入空字符串显示搜索历史
      if (this.keywords.trim() === '') {
        return 'SearchHistory'
      }
      if (this.isShowSearchResult) {
        return 'SearchResult'
      }
      return 'SearchSuggestion'
    }
  },
  methods: {
    onSearch() {
      console.log()
    },
    onCancel() {
      // 回退
      this.$router.go(-1)
    },
    onFocus() {
      this.isShowSearchResult = false
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  [role='button'] {
    color: white;
  }
}
</style>
