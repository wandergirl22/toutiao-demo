import request from '@/utils/request'
import store from '@/store'
/**
 *登录
 * @param {String} mobile 手机号
 * @param {String} code 验证码
 * @returns Promise对象
 */
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { mobile, code }
  })
}
export const sendCode = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}
/**
 * 请求用户自己的信息
 * @returns  Promise对象
 */
export const getUserInfo = () => {
  return request({
    url: '/v1_0/user',
    headers: {
      Authorization: `Bearer ${store.state.user.token}`
    }
  })
}
/**
 * 添加关注
 * @param {*} userId 用户ID
 * @returns Promise对象
 */
export const addFollow = (userId) => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}

/**
 * 取消关注
 * @param {*} userId 用户ID
 * @returns Promise对象
 */

export const removeFollow = (userId) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${userId}`
  })
}
