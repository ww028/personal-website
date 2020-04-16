<template>
  <main>
      <div class="menu" v-show="meun_show">
        <div class="type_title">{{type_title}}</div>
        <ul>
          <li v-for="item in article_list" :key="item.id">
            <nuxt-link
              :class="item.class"
              :to="{name: 'article_info-id', params: {id: `${item.type}-${item.id}-${type_title}`}}"
            >{{ item.title }}</nuxt-link>
          </li>
        </ul>
      </div>

      <div class="content">
        <div class="header_nav">
          <div class="breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>专题文章列表</el-breadcrumb-item>
            </el-breadcrumb>
          </div>

          <div class="mobil_header">
              <nuxt-link :to="{path: '/'}">
                <i class="el-icon-arrow-left"></i>
              </nuxt-link>
              <i class="el-icon-more" @click="showMenu"></i>
          </div>
        </div>
        
        <div class="article_title">{{ article.title }}</div>
        <div class="article_info">
          <span>浏览次数: {{ article.view_count }}</span>
          &emsp;
          <span>发布时间: {{ article.publish_time }}</span>
        </div>
        <div class="article_content" v-html="article.content"></div>
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

      <MsgBoard :type='2' :article_id='article_id'/>
  </main>
</template>

<script>
import * as api from '@/api'
import MsgBoard from '@/components/MsgBoard'
export default {
  components: {
    MsgBoard
  },
  data() {
    return {
      article_id: 0,
      meun_show: true,
    }
  },

  asyncData({ store, error, params }) {
    /**
     * params: type-id-title
     */
    let type = params.id.split('-')[0]
    let id = params.id.split('-')[1]
    let title = params.id.split('-')[2]
    return Promise.all([
      api.articleInfoMenu({ type: type }),
      api.articleInfoContent({ id: id, type: type })
    ])
      .then(arr => {
        arr[0].data.map(item => {
          if (item.id == id) {
            item.class = 'act'
          }
        })

        if (id == 0) {
          arr[0].data[0].class = 'act'
        }
        return {
          article_list: arr[0].data,
          type_title: title,
          article: arr[1].data[0],
          pre: arr[1].pre,
          next: arr[1].next
        }
      })
      .catch(error)
  },

  created(){
    let params = this.$router.currentRoute.params
    this.article_id = Number(params.id.split('-')[1])
  },

  mounted() {
    let _dom = document.documentElement
    let view_width = _dom.clientWidth
    if(view_width < 1000){
      this.meun_show = false
    }

    api.dataAnalysisEdit({
      w_ip: returnCitySN['cip'],
      w_city: returnCitySN['cname'],
      page: 'article',
      article_id: this.article_id
    })
  },

  methods: {
    showMenu() {
      this.meun_show = !this.meun_show
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/article_info.scss';
</style>

<style lang="scss">
pre {
  background-color: #eff2f7;
}

@media screen and (max-width: 1000px) {
  pre {
    overflow: auto;
  }
}
</style>