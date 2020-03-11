<template>
  <div>
    <main class="container">
      <div class="content_module">
        <div
          v-for="(item, index) in content_module"
          :key="index"
          class="item"
          @click="moduleClick(item)"
        >{{ item.name }}</div>
      </div>

      <div class="recently_article">
        <div class="module_title">最近的文章</div>

        <div class="list">
          <div
            v-for="(item, index) in article_list"
            :key="index"
            class="item"
          >
            <div class="info" @click="artilceInfo(item)">
              <div>[ {{item.name}} ]</div>&emsp;
              <div class="article_title">{{ item.title }}</div>
            </div>

            <div>{{ item.publish_time }}</div>
          </div>
        </div>

        <div class="more_artilce">
          <span @click="more">更多文章。。</span>
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
    return Promise.all(
      [
        api.modelsList(),
        api.articleList(),
      ]
    )
      .then(arr => {
        console.log(arr)
        return {
          content_module: arr[0].data || [],
          article_list: arr[1].data || []
        }
      })
      .catch(error)
  },

  mounted(){
    console.log(this.article_list)
  },

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
