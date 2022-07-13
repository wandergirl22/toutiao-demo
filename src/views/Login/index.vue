<template>
  <div>
    <van-nav-bar
      class="navbar"
      title="登录"
      left-text="返回"
      @click-right="backToPrePage"
      ><template #right>
        <van-icon name="cross" class="van-icon" />
      </template>
    </van-nav-bar>
    <van-form @submit="login" class="form">
      <van-field
        v-model="phonenumber"
        name="手机号"
        label="手机号"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请输入手机号' }]"
        ><template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="password"
        type="password"
        name="验证码"
        label="验证码"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请输入验证码' }]"
        ><template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #right-icon>
          <van-button round class="code-btn" size="mini">发送验证码</van-button>
        </template></van-field
      >

      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'Login',
  data() {
    return { phonenumber: '', password: '' }
  },

  methods: {
    backToPrePage() {
      this.$router.back()
    },
    async login() {
      const res = await login(this.phonenumber, this.password)
      console.log(res)
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: rgb(50, 150, 250);

  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
.form {
  :deep(.van-cell__title) {
    flex: 1;
  }
  :deep(.van-cell__value) {
    flex: 20;
  }
  .toutiao {
    font-size: 0.49333rem;
  }
  .code-btn {
    background-color: #eee;
    padding: 0 10px;
    color: #666;
  }
}
</style>
