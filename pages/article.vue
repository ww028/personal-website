<template>
  <main class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="list">
      <div
        v-for="(item, index) in article_list"
        :key="index"
        class="item"
        @click="artilceInfo(item)"
      >
        <div class="info">
          <div>[ {{item.type}} ]</div>&emsp;
          <div class="article_title">{{ item.title }}</div>
        </div>

        <div>{{ item.date }}</div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data(){
    return{
      article_list: [
        { id: 1, type: 'JavaScript', title: 'JavaScript 从入门到入土', date: '2020-02-25' },
        { id: 2, type: 'Node.js', title: '使用express 框架与MySQL 数据库编写接口', date: '2020-02-25'  },
        { id: 3, type: 'Vue.js', title: '有趣的Vue.js', date: '2020-02-25'  },
        { id: 4, type: 'Vue.js', title: '有趣的Vue.js', date: '2020-02-25'  },
        { id: 5, type: 'Vue.js', title: '有趣的Vue.js', date: '2020-02-25'  },
      ],
    }
  },

  methods:{
    artilceInfo(val){
      this.$router.push('/article_info?title=' + val.title)
    },
  }
}
</script>