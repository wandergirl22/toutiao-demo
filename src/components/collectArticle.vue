<template>
  <van-icon
    color="#ffa500"
    :name="value ? 'star' : 'star-o'"
    @click="collect"
    :loading="loading"
  />
</template>

<script>
import { addCollect, removeCollect } from '@/api'

export default {
  name: 'collectArticle',
  data() {
    return {
      loading: false
    }
  },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    article_id: {
      type: [Number, String, Object],
      required: true
    }
  },
  components: {},
  methods: {
    async collect() {
      this.loading = true
      try {
        if (this.value) {
          await removeCollect(this.article_id)
        } else {
          await addCollect(this.article_id)
        }
        this.$emit('input', !this.value)
        this.$toast.success(!this.value ? '取消收藏' : '收藏成功')
      } catch (err) {
        this.$toast('操作失败，请重试')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
