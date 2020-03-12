<template>
  <main class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ article.title }}</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="a_title">{{article.title}}</div>
    <div class="info">
      <span>文章分类：{{ article.name }}</span>
      <span>发布时间：{{ article.publish_time }} </span>
    </div>
    <div>
      {{ article.content }}
    </div>

    <MsgBoard type='2' :article_id="$router.currentRoute.params.id"/>
  </main>
</template>

<script>
import * as api from '@/api'
import MsgBoard from '~/components/MsgBoard'
export default {
  components: {
    MsgBoard
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

  mounted() {
    this.title = this.$router.currentRoute.query.title
  }
}
</script>