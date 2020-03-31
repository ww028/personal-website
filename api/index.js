import request from './request'

// 文章类型
export async function articleType(data = {}) {
  return request({
    url: '/client/article_type/list',
    method: 'post',
    data
  })
}

// 文章列表
export async function articleList(data = {}) {
  return request({
    url: '/client/article/list',
    method: 'post',
    data
  })
}

// 文章详情页菜单
export async function articleInfoMenu(data = {}) {
  return request({
    url: '/client/article_info/menu',
    method: 'post',
    data
  })
}

// 文章详情页内容
export async function articleInfoContent(data = {}) {
  return request({
    url: '/client/article_info/content',
    method: 'post',
    data
  })
}

// 留言板
export async function msgBoardEdit(data = {}) {
  return request({
    url: '/client/msg_board/edit',
    method: 'post',
    data
  })
}

export async function msgBoardList(data = {}) {
  return request({
    url: '/client/msg_board/list',
    method: 'post',
    data
  })
}
