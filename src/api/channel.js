import request from '@/utils/request'
import storage from '@/utils/storage'

/**
 * 获取我的频道列表
 * @returns Promise对象
 */
export const getMyChannels = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
/**
 * 获取所有频道列表
 * @returns Promise对象
 */
export const getAllChannels = () => {
  return request({
    url: '/v1_0/channels'
  })
}
/**
 * 删除用户频道
 * @param {String|Number} target 被删除用户频道id
 * @returns Promise对象
 */
export const delMyChannel = (target) => {
  return request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
}

/**
 * 添加用户频道
 * @param {Number} id  被添加用户频道id
 * @param {Number} seq 被添加用户频道索引下标
 * @returns Promise对象
 */
export const addMyChannel = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}

const HEIMA_TOUTIAO_CHANNELS = 'HEIMA_TOUTIAO_CHANNELS'
export const getMyChannelByLocal = () => storage.get(HEIMA_TOUTIAO_CHANNELS)
export const setMyChannelByLocal = (channel) =>
  storage.set(HEIMA_TOUTIAO_CHANNELS, channel)
export const removeToken = () => storage.remove(HEIMA_TOUTIAO_CHANNELS)
