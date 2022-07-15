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
        :rules="mobileRules"
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
        :rules="codeRules"
        ><template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #right-icon>
          <van-count-down
            v-if="isShow"
            :time="3 * 1000"
            @finish="isShow = false"
          />
          <van-button
            v-else
            round
            class="code-btn"
            size="mini"
            @click="sendCode"
            >发送验证码</van-button
          >
        </template></van-field
      >

      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendCode } from '@/api/user'
import { mobileRules, codeRules } from './rules'
export default {
  name: 'Login',
  data() {
    return {
      phonenumber: '',
      password: '',
      mobileRules,
      codeRules,
      isShow: false
    }
  },

  methods: {
    backToPrePage() {
      this.$router.back()
    },
    async login() {
      // res resolve 的结果
      // 服务器返回的真正数据在 res.data
      // 服务器返回的状态码 res.status
      // error reject 的结果
      // 服务器返回的真正数据在 error.response.data
      // 服务器返回的状态码 error.response.status
      this.$toast.loading({
        message: '正在加载...',
        // loading 时，禁止点击页面
        forbidClick: true
      })

      try {
        const res = await login(this.phonenumber, this.password)
        this.$store.commit('setUser', res.data.data)
        this.$router.push('/profile')
        this.$toast.success('登录成功')
      } catch (error) {
        // 拿到状态码
        const status = error.response.status
        let msg = '登录错误，请刷新~'
        if (status === 400) {
          // 使用服务器提供的消息
          msg = error.response.data.message
        }
        this.$toast.fail(msg)

        // switch (status) {
        //   case 400:
        //     this.$toast.fail(error.response.data.message)
        //     break
        //   case 507:
        //     // 服务端的错误
        //     this.$toast.fail('登录错误，请刷新~')
        //     break
        //   default:
        //     // 其他错误，兜底
        //     this.$toast.fail('登录错误，请刷新~')
        //     break
        // }
      }
    },
    async sendCode() {
      try {
        await this.$refs.form.validate('mobile')
        await sendCode(this.phonenumber)
        this.isShow = true
      } catch (error) {
        // 表单校验失败
        if (!error.response) {
          this.$toast.fail('手机号格式不正确')
        } else {
          // 验证码导致的失败
          const status = error.response.status
          if (status === 400 || status === 429) {
            this.$toast.fail(error.response.data.message)
          }
        }
      }
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
