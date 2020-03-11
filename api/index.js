import request from './request'

// 登录
export async function login(data) {
  return request({
    url: '/login/login',
    method: 'post',
    data
  })
}

// 注册
export async function register(data) {
  console.log(data)
  return request({
    url: '/login/register',
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
    method: 'get',
    data
  })
}
