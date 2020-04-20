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

// 数据统计
export async function dataAnalysisList(data = {}) {
  return request({
    url: '/client/data_analysis/list',
    method: 'post',
    data
  })
}

export async function dataAnalysisEdit(data = {}) {
  return request({
    url: '/client/data_analysis/edit',
    method: 'post',
    data
  })
}

export async function GameList(data = {}) {
  return request({
    url: '/client/guocui_game/list',
    method: 'post',
    data
  })
}

export async function memberList(data = {}) {
  return request({
    url: '/client/guocui_members/list',
    method: 'post',
    data
  })
}

export async function areaList(data = {}) {
  return request({
    // url: `https://restapi.amap.com/v3/config/district?key=${data.key}&offset=${data.offset}`,
    url: `https://restapi.amap.com/v3/config/district?key=${data.key}&offset=${data.offset}&keywords=${data.keywords || ''}`,
    // url: `https://restapi.amap.com/v3/config/district`,
    method: 'get',
    data
  })
}