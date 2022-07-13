import request from '@/utils/request'

/**
 *登录
 * @param {String} phonenumber 手机号
 * @param {String} password 验证码
 * @returns Promise对象
 */
export const login = (phonenumber, password) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { phonenumber, password }
  })
}
