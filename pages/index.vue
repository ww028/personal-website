<template>
  <main>
    <div class="content">
      <div class="c_header">
        <ul>
          <!-- <li class="recently">最近的文章</li> -->
          <li
            v-for="item in article_type"
            :class="item.class"
            :key="item.id"
            @click="changeType(item)"
          >
            {{ item.type_name }}
            <!-- <nuxt-link
              :to="{name: 'article_info-id', params: {id: `${item.id}-0-${item.type_name}`}}"
            >{{ item.type_name }}</nuxt-link>-->
          </li>
        </ul>

        <!-- <div class="search_bar">
          <input v-model="search_content" class="search_input" :class="search_click ? 'search_input_focus' : ''" type="text">
          <el-button @click='searchClick' icon="el-icon-search" size="mini" circle></el-button>
        </div>-->
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
              <i class="el-icon-chat-line-square">&nbsp;{{ item.msg_count }}</i>
            </div>
          </li>
        </ul>
      </div>

      <MsgBoard :type="1" />
    </div>
    <div class="websit_info">
      <div class="info_title">访问信息：</div>
      <div>今日访问人数: {{ today_num }}</div>
      <div>今日访问次数: {{ today_count }}</div>
      <div>历史访问人数: {{ total_num }}</div>
      <div>历史访问次数: {{ total_count }}</div>
    </div>
  </main>
</template>

<script>
import * as api from "@/api";
import MsgBoard from "@/components/MsgBoard";
export default {
  components: {
    MsgBoard
  },
  data() {
    return {
      search_click: false,
      search_content: ""
    };
  },

  asyncData({ store, error, params }) {
    return Promise.all([
      api.articleType(),
      api.articleList({ pageNo: 1, pageSize: 10 }),
      api.dataAnalysisList(),
      api.dataAnalysisEdit({
        page: "首页"
      })
    ])
      .then(arr => {
        arr[0].data.unshift({ id: "", type_name: "最近的文章", class: "act" });
        return {
          article_type: arr[0].data,
          article: arr[1].data,
          article_total: arr[1].total,
          today_num: arr[2].today_num,
          today_count: arr[2].today_count,
          total_num: arr[2].total_num,
          total_count: arr[2].total_count
        };
      })
      .catch(error);
  },

  // mounted() {
  //   api.dataAnalysisEdit({
  //     page: "首页"
  //   });
  // },

  methods: {
    changeType(val) {
      this.article_type.map(item => {
        item.class = "";
      });
      val.class = "act";
      api.articleList({ pageNo: 1, pageSize: 10, type: val.id }).then(res => {
        this.article = res.data || [];
      });
    },

    searchClick() {
      this.search_click = true;
      if (this.search_content) {
        console.log(this.search_content);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/index.scss";
</style>