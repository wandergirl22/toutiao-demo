import dayjs from 'dayjs'
import Vue from 'vue'
import 'dayjs/locale/zh-cn'

// 配置相对时间
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
// 配置中文包
dayjs.locale('zh-cn') // 全局使用
Vue.filter('relativeTime', (value) => {
  return dayjs().to(dayjs(value))
})

export default dayjs

// console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'))
