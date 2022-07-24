<template>
  <van-button
    v-if="!value"
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="loading"
    @click="follow"
    >关注</van-button
  >
  <van-button
    v-else
    class="follow-btn"
    round
    :loading="loading"
    size="small"
    @click="follow"
    >已关注</van-button
  >
</template>

<script>
import { addFollow, removeFollow } from '@/api'
export default {
  name: 'followButton',
  data() {
    return {
      loading: false
    }
  },
  // model: {
  //   prop: 'value',
  //   event: 'input'
  // },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    user_id: {
      type: [Number, String, Object],
      required: true
    }
  },

  created() {},

  methods: {
    // 关注用户
    async follow() {
      this.loading = true
      try {
        if (this.value) {
          await removeFollow(this.user_id)
        } else {
          await addFollow(this.user_id)
        }
        this.$emit('input', !this.value)
      } catch (err) {
        let message = '操作失败，请重试'
        if (err.response && err.response.status === 400) {
          message = '不能关注自己'
        }
        this.$toast.fail(message)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
