<template>
  <main class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章内容</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="a_title">{{title}}</div>
    <div>
      内容
    </div>

    <MsgBoard />
  </main>
</template>

<script>
import MsgBoard from '~/components/MsgBoard'
export default {
  components:{
    MsgBoard
  },
  data(){
    return{
      title: ''
    }
  },

  mounted(){
    this.title = this.$router.currentRoute.query.title
  }
}
</script>