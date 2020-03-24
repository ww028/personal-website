import request from './request'

// 数据采集
export async function dataCol(data) {
  return request({
    url: '/data_collection/edit',
    method: 'post',
    data
  })
}

export async function dataColList(data) {
  return request({
    url: '/data_collection/list',
    method: 'post',
    data
  })
}

// 登录
export async function login(data) {
  return request({
    url: '/login/login',
    method: 'post',
    data
  })
}

// 退出
export async function exit(data) {
  return request({
    url: '/login/exit',
    method: 'post',
    data
  })
}

// 注册
export async function register(data) {
  return request({
    url: '/login/register',
    method: 'post',
    data
  })
}

// 数据统计
export async function collectEdit(data) {
  return request({
    url: '/collect/edit',
    method: 'post',
    data
  })
}


// 文章类型
export async function articleType(data) {
  return request({
    url: '/article_type/list',
    method: 'post',
    data
  })
}

// 文章列表
export async function articleList(data) {
  return request({
    url: '/article/list',
    method: 'post',
    data
  })
}

// 文章详情
export async function articleInfo(data) {
  return request({
    url: '/article/info',
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

// 专题文章列表
export async function typeArticleList(data) {
  return request({
    url: '/type_article/list',
    method: 'post',
    data
  })
}

// 留言板列表
export async function messageList(data) {
  return request({
    url: '/message/list',
    method: 'post',
    data
  })
}

// 留言板列表 编辑
export async function messageEdit(data) {
  return request({
    url: '/message/edit',
    method: 'post',
    data
  })
}
