import request from './request'

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


// 模块列表
export async function modelsList(data) {
  return request({
    url: '/models/list',
    method: 'get',
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
