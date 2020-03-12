<template>
  <div>
    <main class="container">
      <div class="main_content">
        <div class="border_bottom nav_bar">
          <div
            v-for="(item, index) in content_module"
            :key="index"
            class="item"
            @click="moduleClick(item)"
          >{{ item.name }}</div>
        </div>

        <div class="article_list">
          <div v-for="(item, index) in article_list" :key="index" class="border_bottom item">
            <div class="item_content">
              <div class="text info">
                <span>[ {{item.name}} ]</span>
                &nbsp;
                <span>作者</span>
                &nbsp;
                <span>{{ item.publish_time }}</span>
              </div>
              <div class="text_main title">
                <nuxt-link to="/">{{ item.title }}</nuxt-link>
              </div>
              <div class="text preview">预览内容</div>
            </div>
          </div>
        </div>
      </div>
      <MsgBoard />
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
      article_list: [
        {
          id: 1,
          type: 'JavaScript',
          title: 'JavaScript 从入门到入土',
          date: '2020-02-25'
        },
        {
          id: 2,
          type: 'Node.js',
          title: '使用express 框架与MySQL 数据库编写接口',
          date: '2020-02-25'
        },
        { id: 3, type: 'Vue.js', title: '有趣的Vue.js', date: '2020-02-25' },
        { id: 4, type: 'Vue.js', title: '有趣的Vue.js', date: '2020-02-25' },
        { id: 5, type: 'Vue.js', title: '有趣的Vue.js', date: '2020-02-25' }
      ]
    }
  },

  asyncData({ store, error, params }) {
    return Promise.all([api.modelsList(), api.articleList()])
      .then(arr => {
        return {
          content_module: arr[0].data || [],
          article_list: arr[1].data || []
        }
      })
      .catch(error)
  },

  // mounted() {
  //   console.log(this.article_list)
  // },

  methods: {
    moduleClick(val) {
      this.$router.push('/content_module?id=' + val.id)
    },

    artilceInfo(val) {
      this.$router.push('/article_info?title=' + val.title)
    },

    more() {
      this.$router.push('/article')
    }
  }
}
</script>
