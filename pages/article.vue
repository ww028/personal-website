<template>
  <main>
    <div class="main_container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>全部文章</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="m_title">文章列表</div>
      <div class="article">
        <div v-for="(item, index) in article" :key="item.id" class="item">
          <div class="info">
            <span>#{{index+1}}</span>
            <span>文章类型: {{item.type_name}}</span>
            &emsp;
            <span>阅读次数: {{item.view_count}}</span>
          </div>

          <div class="title_info">
            <nuxt-link class="title" :to="{name: 'article_info' }">{{ item.title }}</nuxt-link>
            <div class="create_time">{{item.create_time}}</div>
          </div>

          <div class="preview">{{ item.preview }}</div>
        </div>
      </div>
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="sub_data.pageNo"
        :page-size="5"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </main>
</template>

<script>
import * as api from '@/api'
export default {
  data() {
    return {
      sub_data: {
        type: '',
        pageNo: 1,
        pageSize: 5
      }
    }
  },

  asyncData({ store, error, params }) {
    return Promise.all([
      api.articleList({ type: 0, pageNo: 1, pageSize: 5 })
    ])
      .then(arr => {
        console.log(arr[0].data)
        return {
          article: arr[0].data || [],
          total: arr[0].total
        }
      })
      .catch(err => {
        error(err)
      })
  },

  mounted(){
    console.log(this.$router)
  },

  methods:{
    handleCurrentChange(val) {
      this.sub_data.pageNo = val
      api.articleList(this.sub_data).then(res => {
        this.article = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.article {
  font-size: 14px;
  color: rgb(211, 209, 209);

  .item {
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: solid 1px rgba($color: #888282, $alpha: 0.9);
  }

  .title_info {
    display: flex;
    justify-content: space-between;
    padding-left: 20px;

    .title {
      font-size: 16px;
      margin: 10px 0;
      color: #fff;
    }
  }

  .preview {
    padding-left: 20px;
    height: 38px;
    // line-height: 20px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    letter-spacing: 2px;
  }
}
</style>