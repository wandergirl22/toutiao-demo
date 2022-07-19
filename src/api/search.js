import request from '@/utils/request'
/**
 * 获取搜索建议
 * @param {String} q 关键词
 * @returns Promise对象
 */
export const getSearchSuggestion = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}
