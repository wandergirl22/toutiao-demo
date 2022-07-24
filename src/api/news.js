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
/**
 * 获取文章详情
 * @returns Promise对象
 */
export const getArticleById = (articleId) => {
  return request({
    url: `/v1_0/articles/${articleId}`
  })
}
/**
 * 收藏文章
 * @param {*} target 文章ID
 * @returns Promise对象
 */
export const addCollect = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: { target }
  })
}

/**
 * 取消收藏
 * @param {*} target 文章ID
 * @returns Promise对象
 */
export const removeCollect = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`
  })
}
/**
 * 点赞文章
 * @param {*} target 文章ID
 * @returns Promise对象
 */
export const addLike = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: { target }
  })
}

/**
 * 取消文章
 * @param {*} target 文章ID
 * @returns Promise对象
 */
export const removeLike = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${target}`
  })
}
