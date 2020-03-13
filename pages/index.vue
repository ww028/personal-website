<template>
  <div>
    <main class="container">
      <div class="main_content">
        <div class="border_bottom nav_bar">
          <div
            v-for="(item, index) in content_module"
            :key="index"
            class="item"
            :class="item.class"
            @click="moduleClick(item)"
          >{{ item.name }}</div>
        </div>

        <div class="article_list">
          <div v-if="article_list.length ===0" class="article_null">暂无内容</div>
          <div v-else>
            <div v-for="(item, index) in article_list" :key="index" class="border_bottom item">
              <div class="item_content">
                <div class="text info">
                  <span>[ {{item.name}} ]</span>
                </div>
                <div class="text_main title">
                  <nuxt-link :to="{name: 'article_info-id', params: {id: item.id, from: 'home' }}">
                    {{ item.title }}
                  </nuxt-link>
                  <span>{{ item.publish_time }}</span>
                </div>
                <div class="text preview">{{ item.preview }}</div>
              </div>
            </div>
            <div class="more_ariticle">
              <el-button type="text" @click="moreArticle">查看更多文章</el-button>
            </div>
          </div>
        </div>
      </div>
      <MsgBoard type='1'/>
    </main>
  </div>
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
      content_module: []
    }
  },
 
  asyncData({ store, error, params }) {
    return Promise.all([api.modelsList(), api.articleList({type: 0, pageNo: 1, pageSize: 5})])
      .then(arr => {
        console.log(arr[1].data)
        return {
          content_module: arr[0].data || [],
          article_list: arr[1].data || []
        }
      })
      .catch(error)
  },

  mounted(){
    this.content_module.unshift({id: 0, name: '全部', class: 'act'})
  },

  methods: {
    moduleClick(val) {
      this.content_module.map(item => {
        item.class = ''
      })
      val.class = 'act'

      api.articleList({ type: val.id }).then(res => {
        this.article_list = res.data
      })
    },

    artilceInfo(val) {
      this.$router.push('/article_info?title=' + val.title)
    },

    moreArticle() {
      this.$router.push('/article')
    }
  }
}
</script>
