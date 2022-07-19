import request from '@/utils/request'
/**
 * 获取频道文章
 * @param {Number} channelId 频道的id
 * @param {Number} timestamp 第一页的时间戳，上一页的时间戳pre-timestamp
 * @returns Promise对象
 */
export const getArticleList = (channelId, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp
    }
  })
}
