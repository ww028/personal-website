<template>
  <div>
    <main class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>全部文章</el-breadcrumb-item>
      </el-breadcrumb>

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
                  <nuxt-link
                    :to="{name: 'article_info-id', params: {id: item.id, from: 'article' }}"
                  >{{ item.title }}</nuxt-link>
                  <span>{{ item.publish_time }}</span>
                </div>
                <div class="text preview">{{ item.preview }}</div>
              </div>
            </div>
          </div>
        </div>

        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page="sub_data.pageNo"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </main>
  </div>
</template>

<script>
import * as api from '@/api'
export default {
  data() {
    return {
      content_module: [],
      sub_data: {
        type: '',
        pageNo: 1,
        pageSize: 10
      }
    }
  },

  asyncData({ store, error, params }) {
    return Promise.all([
      api.modelsList(),
      api.articleList({ type: 0, pageNo: 1, pageSize: 10 })
    ])
      .then(arr => {
        return {
          content_module: arr[0].data || [],
          article_list: arr[1].data || [],
          total: arr[1].total
        }
      })
      .catch(error)
  },

  mounted() {
    this.content_module.unshift({ id: 0, name: '全部', class: 'act' })
  },

  methods: {
    moduleClick(val) {
      this.sub_data.pageNo = 1
      this.sub_data.type = val.id
      this.content_module.map(item => {
        item.class = ''
      })
      val.class = 'act'

      api.articleList(this.sub_data).then(res => {
        this.article_list = res.data
        this.total = res.total
      })
    },

    artilceInfo(val) {
      this.$router.push('/article_info?title=' + val.title)
    },

    handleCurrentChange(val) {
      this.sub_data.pageNo = val
      api.articleList(this.sub_data).then(res => {
        this.article_list = res.data
      })
    }
  }
}
</script>
