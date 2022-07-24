<template>
  <van-icon name="share" color="#777777" @click="showShare = true">
    <van-share-sheet
      :v-model:show="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onSelect"
    />
  </van-icon>
</template>

<script>
export default {
  setup() {
    const showShare = this.$refs(false)
    const options = [
      { name: '微信', icon: 'wechat' },
      { name: '微博', icon: 'weibo' },
      { name: '复制链接', icon: 'link' },
      { name: '分享海报', icon: 'poster' },
      { name: '二维码', icon: 'qrcode' }
    ]
    const onSelect = (option) => {
      this.$toast(option.name)
      showShare.value = false
    }
    return { options, onSelect, showShare }
  }
}
</script>

<style></style>
