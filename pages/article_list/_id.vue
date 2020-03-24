<template>
  <main>
    <!-- <div class="main_container"> -->
    <!-- <div class="m_title">相关的文章</div> -->

    <div class="content_box">
      <div class="aside">
        <div class="breadcrumb">
          <nuxt-link :to="{name: 'home' }">首页</nuxt-link>
          <div>&lt;</div>
          <div>文章列表</div>
        </div>
        <div class="type_title">{{ type_title }}</div>
        
        <div v-for="item in article_list" :key="item.id" class="item">
          <nuxt-link
            :to="{name: 'article_list-id', params: {id: `${item.type}-${item.id}-${item.title}`}}"
          >{{ item.title }}</nuxt-link>
        </div>
      </div>
      <div class="article_info">
        <div class="article_title">{{ article_title }}</div>
        <div class="article_content" v-html="content"></div>
      </div>
    </div>
    <!-- </div> -->
  </main>
</template>

<script>
import * as api from '@/api'
export default {
  data() {
    return {
      loading: false,
      article_title: '',
    }
  },

  asyncData({ store, error, params }) {
    /**
     * params: type-id-title
     */
    let type = params.id.split('-')[0]
    let id = params.id.split('-')[1]
    let title = params.id.split('-')[2]
    return Promise.all(
      [
        api.typeArticleList({ type: type }),
        api.articleContent({id: id})
      ]
    )
      .then(arr => {
        return { 
          article_list: arr[0].data,
          type_title: title,
          article_title: arr[1].data[0].title,
          content: arr[1].data[0].content
        }
      })
      .catch(error)
  },
}
</script>

<style lang="scss" scoped>
main {
  background-color: rgb(192, 180, 164);
  // background-color: rgb(212, 204, 194);
  color: #000;
  padding: 0;

  a,
  .breadcrumb {
    color: #000;
  }
}

.breadcrumb {
  margin-bottom: 10px;
}

.m_title {
  text-align: center;
  border-bottom: solid 1px #000;
  line-height: 40px;
}

.content_box {
  display: flex;
  font-size: 14px;

  .aside {
    width: 200px;
    height: 100vh;
    border-right: solid 1px #000;
    padding: 10px;
    margin-right: 10px;

    .type_title{
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 10px;
    }

    .item {
      cursor: pointer;
      height: 24px;
      line-height: 24px;
    }
  }

  .article_info {
    width: 0;
    flex-grow: 1;
    height: 100vh;
    padding: 10px;
    overflow: auto;
    .article_title {
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 10px;
    }
  }
}
</style>

<style lang="scss">
.article_content {
  >p,
  >div{
    width: 800px;
  }
  a{
    color: #000;
  }
}
</style>
