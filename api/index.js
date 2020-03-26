import request from './request'

// 文章类型
export async function articleType(data) {
  return request({
    url: '/article/article_type_list',
    method: 'post',
    data
  })
}

// 文章列表
export async function articleList(data) {
  return request({
    url: '/article/article_list',
    method: 'post',
    data
  })
}

// 专题文章列表
export async function typeArticleList(data) {
  return request({
    url: '/type_article/list',
    method: 'post',
    data
  })
}

// 文章内容
export async function articleContent(data) {
  return request({
    url: '/article/content',
    method: 'post',
    data
  })
}