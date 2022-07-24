import Vue from 'vue'
import Vuex from 'vuex'
// import storage from '../utils/storage.js'
import { getToken, setToken } from '@/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  // 声明数据
  state: {
    // user:{}
    // user: JSON.parse(localStorage.getItem('HEIMA_YOUTIAO_TOKEN')) || {}
    // user: storage.get('HEIMA_YOUTIAO_TOKEN')
    user: getToken() || {}
  },
  // 修改数据
  mutations: {
    setUser(state, payload) {
      state.user = payload
      // localStorage.getItem('HEIMA_YOUTIAO_TOKEN', JSON.stringify(payload))
      // storage.set('HEIMA_YOUTIAO_TOKEN', payload)
      setToken(payload)
    }
  },

  actions: {},
  modules: {}
})
