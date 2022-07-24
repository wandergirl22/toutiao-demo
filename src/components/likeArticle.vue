<template>
  <van-icon
    :color="value === 1 ? 'red' : ''"
    :name="value === 1 ? 'good-job' : 'good-job-o'"
    :loading="loading"
    @click="like"
  />
</template>

<script>
import { addLike, removeLike } from '@/api'
export default {
  name: 'likeArticle',
  data() {
    return {
      loading: false
    }
  },
  props: {
    value: {
      type: Number,
      required: true
    },
    article_id: {
      type: [Number, String, Object],
      required: true
    }
  },
  created() {},
  methods: {
    async like() {
      this.loading = true
      try {
        let status = -1
        if (this.value === 1) {
          await removeLike(this.article_id)
        } else {
          await addLike(this.article_id)
          status = 1
        }
        this.$emit('input', status)
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败')
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less"></style>
