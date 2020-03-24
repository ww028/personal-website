<template>
  <main>
    <div class="main_container">
      <div class="breadcrumb">
        <nuxt-link :to="{name: 'home' }">首页</nuxt-link>
        <div>&lt;</div>
        <div>文章内容</div>
      </div>

      <div class="article_title">{{article.title}}</div>
      <div class="article_info">
        <span>文章类型: {{article.type_name}}</span>
        &emsp;
        <span>阅读次数: {{total_view}}</span>
        &emsp;
        <span>发布时间: {{article.publish_time}}</span>
      </div>

      <div class="article_content" v-html="article.content"></div>
      
      <MsgBoard type="2" :article_id="article.id"/>
    </div>
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
    return Promise.all(
      [
        api.dataCol({ page: 'article', article_id: params.id }),
        api.articleList({ id: params.id }),
      ]
    )
      .then(arr => {
        console.log(arr[1])
        return {
          article: arr[1].data[0],
          total_view: arr[1].total_view
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
  overflow: auto;
}

@media screen and (max-width: 1000px) {
  .article_content{
    font-size: 0.3rem;
  }
}
</style>