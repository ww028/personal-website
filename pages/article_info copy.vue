<template>
  <main>
    <div class="main_container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>全部文章</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="article_title">文章标题</div>
      <div class="article_info">
        <span>文章类型: HTML</span>
        &emsp;
        <span>阅读次数: 100</span>
        &emsp;
        <span>发布时间: 2020/03/16</span>
      </div>
      <div class="article_content">
        文章内容
      </div>
      <div class="pre">
        <nuxt-link :to="{name: 'article_info' }"><i class="el-icon-back"></i>&nbsp;上一篇《上一篇》</nuxt-link>
        <nuxt-link :to="{name: 'article_info' }">下一篇《下一篇》&nbsp;<i class="el-icon-right"></i></nuxt-link>
      </div>
    </div>
  </main>
</template>

<script>
import * as api from '@/api'
import MsgBoard from '~/components/MsgBoard'
export default {
  components: {
    MsgBoard, Breadcrumb
  },
  data() {
    return {
      title: '',
      article_id: ''
    }
  },

  asyncData({ store, error, params }) {
    return Promise.all([api.articleList({ id: params.id })])
      .then(arr => {
        return {
          article: arr[0].data[0] || []
        }
      })
      .catch(error)
  },

}
</script>

<style lang="scss" scoped>
.article_title {
  text-align: center;
  font-size: 20px;
  letter-spacing: 2px;
}

.article_info{
  text-align: center;
  font-size: 14px;
  color: rgb(211, 209, 209);
  margin-top: 10px;
}

.article_content{
  margin: 10px 0;
}

.pre{
  display: flex;
  justify-content: space-between;
}
</style>