<template>
  <main class="container">
    <Breadcrumb />
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ article.title }}</el-breadcrumb-item>
    </el-breadcrumb> -->

    <div class="article_content">
      <div class="title">{{article.title}}</div>
      <div class="info">
        <span>文章分类：{{ article.name }}</span>
        <span>发布时间：{{ article.publish_time }}</span>
      </div>
      <div v-html="article.content"></div>
      <!-- <div>{{ article.content }}</div> -->
    </div>

    <MsgBoard type="2" :article_id="$router.currentRoute.params.id" />
  </main>
</template>

<script>
import * as api from '@/api'
import MsgBoard from '~/components/MsgBoard'
import Breadcrumb from '~/components/Breadcrumb'
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

  mounted() {
    // if(this.$router.currentRoute.params.from){
    //   localStorage.setItem('from', this.$router.currentRoute.params.from)
    // }
    // let from = localStorage.getItem('from')
    // if(from === 'home'){
    //   breadcrumb
    // } else {

    // }
    // console.log(this.$router.currentRoute)
    this.title = this.$router.currentRoute.query.title
  }
}
</script>