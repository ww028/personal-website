<template>
  <main>
    <div class="header_nav">
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>专题文章列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="type_title">{{type_title}}</div>
    </div>
    <div class="container">
      <div class="menu">
        <ul>
          <li v-for="item in article" :key="item.id" >
            <nuxt-link
              :class="item.class"
              :to="{name: 'article_info-id', params: {id: `${item.type}-${item.id}-${type_title}`}}"
            >{{ item.title }}</nuxt-link>
          </li>
        </ul>
      </div>
      <div class="content">
        <div class="article_title">{{ article_title }}</div>
        <div class="article_content" v-html="content"></div>
        <div class="bottom_nav">
          <nuxt-link
            v-if="pre.id"
            class="pre"
            :to="{name: 'article_info-id', params: {id: `${pre.type}-${pre.id}-${type_title}`}}"
          >上一篇 《{{ pre.title }}》</nuxt-link>
          <div v-else>&emsp;</div>
          <nuxt-link
            v-if="next.id"
            class="next"
            :to="{name: 'article_info-id', params: {id: `${next.type}-${next.id}-${type_title}`}}"
          >下一篇 《{{ next.title }}》</nuxt-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import * as api from '@/api'
export default {
  asyncData({ store, error, params }) {
    /**
     * params: type-id-title
     */
    let type = params.id.split('-')[0]
    let id = params.id.split('-')[1]
    let title = params.id.split('-')[2]
    return Promise.all([
      api.typeArticleList({ type: type }),
      api.articleContent({ id: id, type: type })
    ])
      .then(arr => {
        arr[0].data.map(item =>{
          if(item.id == id){
            item.class = 'act'
          }
        })
        
        if(id == 0){
          arr[0].data[0].class = 'act'
        }
        console.log(arr[0].data)
        return {
          article: arr[0].data,
          type_title: title,
          article_title: arr[1].data[0].title,
          content: arr[1].data[0].content,
          pre: arr[1].pre,
          next: arr[1].next
        }
      })
      .catch(error)
  },

  mounted() {
    api.dataAnalysis({
      w_ip: returnCitySN['cip'],
      w_city: returnCitySN['cname'],
      page: 'article'
    })
  },
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/article_info.scss';
</style>

<style lang="scss">
pre {
  background-color: #eff2f7;
}
</style>