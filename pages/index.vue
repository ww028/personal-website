<template>
  <main>
    <div class="content">
      <div class="c_header">
        <ul>
          <li class="recently">最近的文章</li>
          <li v-for="item in article_type" :key="item.id" @click="changeType(item)">
            <nuxt-link
              :to="{name: 'article_info-id', params: {id: `${item.id}-0-${item.type_name}`}}"
            >{{ item.type_name }}</nuxt-link>
            <!-- <a href="#">{{ item.type_name }}</a> -->
          </li>
        </ul>
      </div>

      <div class="article_list">
        <ul>
          <li v-for="item in article" :key="item.id">
            <div class="article_info">
              <span :class="'item_type_'+item.type">{{item.type_name}}</span>
              <span style="margin: 0 5px">·</span>
              <span>{{item.edit_time}}</span>
            </div>
            <div class="title">
              <nuxt-link
                :to="{name: 'article_info-id', params: {id: `${item.type}-${item.id}-${item.type_name}`}}"
              >{{ item.title }}</nuxt-link>
            </div>
            <div class="preview">{{ item.preview }}</div>
            <div class="read_info">
              <i class="el-icon-view">&nbsp;{{ item.view_count }}</i>
              <i class="el-icon-chat-line-square">15</i>
            </div>
          </li>
        </ul>
      </div>

      <MsgBoard />
    </div>
    <div class="websit_info">
      websit_info
      
      <!-- <div class="info_title">每一天都是一个特殊的日子</div>
      <div class="festival">今天是: 大撒法</div> -->
      <!-- <div>
        今天是：xxxx
      </div>-->

      <!-- <div class="info_title">数据统计：</div> -->
      <!-- <div>今日访问人数: {{ today_num }}</div>
      <div>今日访问次数: {{ today_count }}</div>
      <div>历史访问人数: {{ total_num }}</div>
      <div>历史访问次数: {{ total_count }}</div> -->
    </div>
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
      article_type: [],
      article: []
    }
  },

  asyncData({ store, error, params }) {
    return Promise.all([
      api.articleType(),
      api.articleList({ pageNo: 1, pageSize: 10 }),
      // api.dataAnalysisGet()
    ])
      .then(arr => {
        console.log(arr[0].data)
        return {
          article_type: arr[0].data,
          article: arr[1].data,
          article_total: arr[1].total,
          // today_num: arr[2].today_num,
          // today_count: arr[2].today_count,
          // total_num: arr[2].total_num,
          // total_count: arr[2].total_count
        }
      })
      .catch(error)
  },

  // mounted() {
  //   api.dataAnalysis({
  //     w_ip: returnCitySN['cip'],
  //     w_city: returnCitySN['cname'],
  //     page: 'index'
  //   })
  // },

  methods: {
    changeType(val) {
      api.articleList({ pageNo: 1, pageSize: 10 })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/index.scss';
</style>