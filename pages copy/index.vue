<template>
  <main>
    <div class="content">
      <div class="c_header">
        <ul>
          <li><a href="#">最近的文章</a></li>
          <li v-for="item in article_type" :key="item.id" @click="changeType(item)">
            <a href="#">{{ item.type_name }}</a>
          </li>
        </ul>
      </div>

      <div class="article_list">
        <ul>
          <li
            v-for="item in article"
            :key="item.id"
          >
            <div class="article_info">
              <span :class="'item_type_'+item.type">{{item.type_name}}</span>
              <span style="margin: 0 5px">·</span>
              <span>{{item.edit_time}}</span>
            </div>
            <div class="title">
              <a href="#">{{item.title}}</a>
            </div>
            <div class="preview">
              {{ item.preview }}
            </div>
            <div class="read_info">
              <i class="el-icon-view"> 15</i>
              <i class="el-icon-chat-line-square"> 15</i>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="websit_info">
      <div class="info_title">数据统计：</div>
      <div>今日访问人数: * </div>
      <div>今日访问次数: * </div>
      <div>历史访问人数: * </div>
      <div>历史访问次数: * </div>
    </div>
  </main>
</template>

<script>
import * as api from '@/api'
export default {
  data() {
    return {
    }
  },

  asyncData({ store, error, params }) {
    return Promise.all(
      [
        api.articleList({ pageNo: 1, pageSize: 10 }),
        api.articleType()
      ]
    )
      .then(arr => {
        console.log(arr[1])
        return {
          article: arr[0].data,
          article_total: arr[0].total,
          article_type: arr[1].data
        }
      })
      .catch(error)
  },

  methods:{
    changeType(val){
      api.articleList({ pageNo: 1, pageSize: 10 })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/index.scss';
</style>